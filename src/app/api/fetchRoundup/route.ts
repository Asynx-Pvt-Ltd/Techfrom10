import { Pool } from 'pg';

const pool = new Pool({
	connectionString: process.env.postgresql_URL,
});

const getDB = async () => {
	const client = await pool.connect();
	return client;
};

export const GET = async (req: Request) => {
	const client = await getDB();

	try {
		const url = new URL(req.url);
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '10');
		const searchQuery = url.searchParams.get('search') || '';
		const tagsParam = url.searchParams.get('tags') || '';
		const dateFrom = url.searchParams.get('from') || '';
		const dateTo = url.searchParams.get('to') || '';

		const validPage = Math.max(1, page);
		const validLimit = Math.min(Math.max(1, limit), 100);
		const offset = (validPage - 1) * validLimit;

		// Parse selected tags
		const selectedTags = tagsParam
			? decodeURI(tagsParam)
					.split(',')
					.map((tag) => tag.trim())
					.filter((tag) => tag)
			: [];

		// Build the search condition
		let whereConditions: string[] = [];
		let dataQueryParams: (number | string)[] = [];
		let countQueryParams: (number | string)[] = [];
		let paramIndex = 1;

		// Add search condition if search query exists
		if (searchQuery.trim()) {
			// Use separate parameters for each ILIKE operation to avoid type conflicts
			whereConditions.push(`(
				EXISTS (
					SELECT 1 FROM unnest(headlines) AS headline 
					WHERE headline ILIKE $${paramIndex}
				) OR
				EXISTS (
					SELECT 1 FROM unnest(summaries) AS summary 
					WHERE summary ILIKE $${paramIndex + 1}
				) OR
				EXISTS (
					SELECT 1 FROM unnest(sources) AS source 
					WHERE source ILIKE $${paramIndex + 2}
				) OR
				EXISTS (
					SELECT 1 FROM unnest(hashtags) AS hashtag 
					WHERE hashtag ILIKE $${paramIndex + 3}
				) OR
				title ILIKE $${paramIndex + 4}
			)`);

			const searchParam = `%${searchQuery.trim()}%`;
			// Add the same search parameter 5 times for the 5 ILIKE operations
			for (let i = 0; i < 5; i++) {
				dataQueryParams.push(searchParam);
				countQueryParams.push(searchParam);
			}
			paramIndex += 5;
		}

		// Add tags filter condition if tags are selected
		if (selectedTags.length > 0) {
			// Create a condition that checks if any of the selected tags exist in the hashtags array
			const tagConditions = selectedTags.map((tag, index) => {
				const currentParamIndex = paramIndex + index;
				dataQueryParams.push(tag);
				countQueryParams.push(tag);
				return `$${currentParamIndex} = ANY(hashtags)`;
			});

			whereConditions.push(`(${tagConditions.join(' OR ')})`);
			paramIndex += selectedTags.length;
		}

		// Add date range filter condition if dates are provided
		if (dateFrom || dateTo) {
			if (dateFrom && dateTo) {
				// Both from and to dates provided
				whereConditions.push(
					`TO_DATE(date, 'Mon DD, YYYY') BETWEEN $${paramIndex} AND $${
						paramIndex + 1
					}`,
				);
				dataQueryParams.push(dateFrom, dateTo);
				countQueryParams.push(dateFrom, dateTo);
				paramIndex += 2;
			} else if (dateFrom) {
				// Only from date provided
				whereConditions.push(`TO_DATE(date, 'Mon DD, YYYY') >= $${paramIndex}`);
				dataQueryParams.push(dateFrom);
				countQueryParams.push(dateFrom);
				paramIndex += 1;
			} else if (dateTo) {
				// Only to date provided
				whereConditions.push(`TO_DATE(date, 'Mon DD, YYYY') <= $${paramIndex}`);
				dataQueryParams.push(dateTo);
				countQueryParams.push(dateTo);
				paramIndex += 1;
			}
		}

		// Combine all conditions
		const whereClause =
			whereConditions.length > 0
				? `WHERE ${whereConditions.join(' AND ')}`
				: '';

		// Add pagination parameters
		dataQueryParams.push(validLimit, offset);

		// Get total count with search filter
		const countQuery = `SELECT COUNT(*) FROM tech_trends ${whereClause}`;
		const countRes = await client.query(countQuery, countQueryParams);

		// Get paginated results with filters
		const dataQuery = `
			SELECT * FROM tech_trends 
			${whereClause}
			ORDER BY TO_DATE(date, 'Mon DD, YYYY') DESC 
			LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
		`;

		const res = await client.query(dataQuery, dataQueryParams);

		const totalItems = parseInt(countRes.rows[0].count);
		const totalPages = Math.ceil(totalItems / validLimit);

		const response = {
			data: res.rows,
			pagination: {
				currentPage: validPage,
				totalPages,
				totalItems,
				itemsPerPage: validLimit,
				hasNextPage: validPage < totalPages,
				hasPreviousPage: validPage > 1,
			},
			searchQuery: searchQuery.trim(),
			selectedTags,
			dateFilter: {
				from: dateFrom || null,
				to: dateTo || null,
			},
		};
		return new Response(JSON.stringify(response), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Database error:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	} finally {
		client.release();
	}
};

export const POST = async (req: Request) => {
	const client = await getDB();

	try {
		const { headline } = await req.json();

		// Validate input
		if (!headline || typeof headline !== 'string') {
			return new Response(
				JSON.stringify({ error: 'Invalid headline parameter' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}

		const res = await client.query(
			'SELECT * FROM tech_trends WHERE $1 = ANY(slugheadlines);',
			[headline],
		);

		if (res.rows.length > 0) {
			const newsItem = res.rows[0];
			const index = newsItem.slugheadlines.indexOf(headline);

			if (index === -1) {
				return new Response(
					JSON.stringify({ error: 'Headline not found in slugheadlines' }),
					{
						status: 404,
						headers: { 'Content-Type': 'application/json' },
					},
				);
			}

			const responseData = {
				headline: newsItem.headlines[index],
				summary: newsItem.summaries[index],
				published: newsItem.published[index],
				img_url: newsItem.img_url,
				source: newsItem.sources[index],
				hashtags: newsItem.hashtags[index],
			};

			return new Response(JSON.stringify(responseData), {
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(JSON.stringify({ error: 'Not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Database error:', error);
		return new Response(
			JSON.stringify({ error: 'Failed to process request' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	} finally {
		client.release();
	}
};
