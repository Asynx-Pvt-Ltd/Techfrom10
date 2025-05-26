interface ArticleData {
	headline: string;
	summary: string;
	published: string;
	source: string;
	hashtags: string;
	img_url?: string;
}

interface CategoryNews {
	img_url: string;
	headline: string;
	slugheadline: string;
	summary: string;
	source?: string;
}

interface PageData {
	article: ArticleData;
	categoryNews: CategoryNews[];
}

export async function fetchArticleData(
	headline: string,
): Promise<ArticleData | null> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchRoundup`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ headline }),
				cache: 'no-store', // Use for dynamic content
				// Alternative: cache: "force-cache", next: { revalidate: 3600 } // for ISR
			},
		);

		if (!response.ok) {
			return null;
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching article:', error);
		return null;
	}
}

export async function fetchCategoryNews(
	hashtags: string,
	excludeHeadline: string,
	count = 6,
): Promise<CategoryNews[]> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchCategory`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ category: hashtags }),
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			return [];
		}

		const categoryData: CategoryNews[] = await response.json();
		return categoryData
			.filter((news) => news.headline !== excludeHeadline)
			.slice(0, count);
	} catch (error) {
		console.error('Error fetching category news:', error);
		return [];
	}
}

export async function getArticlePageData(
	headline: string,
): Promise<PageData | null> {
	const article = await fetchArticleData(headline);

	if (!article) {
		return null;
	}

	const categoryNews = await fetchCategoryNews(
		article.hashtags,
		article.headline,
	);

	return {
		article,
		categoryNews,
	};
}
