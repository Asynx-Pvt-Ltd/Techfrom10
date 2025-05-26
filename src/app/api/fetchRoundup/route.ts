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

		const validPage = Math.max(1, page);
		const validLimit = Math.min(Math.max(1, limit), 100);
		const offset = (validPage - 1) * validLimit;

		// Build the search condition
		let whereClause = '';
		let dataQueryParams: (number | string)[] = [];
		let countQueryParams: (number | string)[] = [];

		if (searchQuery.trim()) {
			// Fixed search query - hashtags is a simple text array, not nested
			whereClause = `
	WHERE (
		EXISTS (
			SELECT 1 FROM unnest(headlines) AS headline 
			WHERE headline ILIKE $1
		) OR
		EXISTS (
			SELECT 1 FROM unnest(summaries) AS summary 
			WHERE summary ILIKE $1
		) OR
		EXISTS (
			SELECT 1 FROM unnest(sources) AS source 
			WHERE source ILIKE $1
		) OR
		EXISTS (
			SELECT 1 FROM unnest(hashtags) AS hashtag 
			WHERE hashtag ILIKE $1
		) OR
		title ILIKE $1
	)
`;
			const searchParam = `%${searchQuery.trim()}%`;
			dataQueryParams = [searchParam, validLimit, offset];
			countQueryParams = [searchParam];
		} else {
			dataQueryParams = [validLimit, offset];
			countQueryParams = [];
		}

		// Get total count with search filter
		const countQuery = `SELECT COUNT(*) FROM tech_trends ${whereClause}`;
		const countRes = await client.query(countQuery, countQueryParams);

		// Get paginated results with search filter
		let dataQuery = '';
		if (searchQuery.trim()) {
			dataQuery = `
				SELECT * FROM tech_trends 
				${whereClause}
				ORDER BY TO_DATE(date, 'Mon DD, YYYY') DESC 
				LIMIT $2 OFFSET $3
			`;
		} else {
			dataQuery = `
				SELECT * FROM tech_trends 
				ORDER BY TO_DATE(date, 'Mon DD, YYYY') DESC 
				LIMIT $1 OFFSET $2
			`;
		}

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
