// src/app/categories/[category]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Footer from '@/components/footer/footer';
import { CategoryHeader } from '@/components/category/CategoryHeader';
import { CategoryContent } from '@/components/category/CategoryContent';
import { CategorySidebar } from '@/components/category/CategorySidebar';

interface CategoryPageProps {
	params: { category: string };
	searchParams: {
		page?: string;
		search?: string;
		from?: string;
		to?: string;
		view?: string;
	};
}

interface NewsItem {
	_id: string;
	headline: string;
	title: string;
	slugtitle: string;
	headlines: string;
	slugheadline: string;
	summary: string;
	date: string;
	img_url?: string;
	source?: string;
	sources: string[];
	published: string;
	hashtags: string[];
}

async function fetchCategoryData(category: string) {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchCategory`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ category }),
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			return null;
		}

		const data: NewsItem[] = await response.json();
		return data.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
	} catch (error) {
		console.error('Error fetching category data:', error);
		return null;
	}
}

async function fetchLatestNews() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchRoundup`,
			{ cache: 'no-store' },
		);

		if (!response.ok) {
			throw new Error('Failed to fetch latest news');
		}

		const data: NewsItem[] = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching latest news:', error);
		return [];
	}
}

function filterData(
	data: NewsItem[],
	searchParams: CategoryPageProps['searchParams'],
) {
	let filtered = [...data];

	// Search filter
	if (searchParams.search) {
		const query = searchParams.search.toLowerCase();
		filtered = filtered.filter(
			(item) =>
				item.headline.toLowerCase().includes(query) ||
				item.title.toLowerCase().includes(query),
		);
	}

	// Date filter
	if (searchParams.from || searchParams.to) {
		filtered = filtered.filter((item) => {
			const itemDate = new Date(item.date);
			const fromDate = searchParams.from ? new Date(searchParams.from) : null;
			const toDate = searchParams.to ? new Date(searchParams.to) : null;

			if (fromDate && itemDate < fromDate) return false;
			if (toDate && itemDate > toDate) return false;
			return true;
		});
	}

	return filtered;
}

function paginateData(
	data: NewsItem[],
	page: number,
	itemsPerPage: number = 10,
) {
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	return {
		data: data.slice(0, endIndex), // For "load more" behavior
		pagination: {
			currentPage: page,
			totalPages: Math.ceil(data.length / itemsPerPage),
			totalItems: data.length,
			itemsPerPage,
			hasNextPage: endIndex < data.length,
			hasPreviousPage: page > 1,
		},
	};
}

export async function generateMetadata({
	params,
}: CategoryPageProps): Promise<Metadata> {
	const categoryName =
		params.category.charAt(0).toUpperCase() + params.category.slice(1);

	return {
		title: `Latest ${categoryName} News - TechFrom10`,
		description: `Stay updated with the latest ${categoryName.toLowerCase()} news, trends, and insights from TechFrom10.`,
	};
}

export default async function CategoryPage({
	params,
	searchParams,
}: CategoryPageProps) {
	const currentPage = parseInt(searchParams.page || '1');
	const isUnifiedView = searchParams.view === 'unified';

	// Fetch data
	const [categoryData, latestNews] = await Promise.all([
		fetchCategoryData(params.category),
		fetchLatestNews(),
	]);

	if (!categoryData) {
		notFound();
	}

	// Filter and paginate data
	const filteredData = filterData(categoryData, searchParams);
	const paginatedResult = paginateData(filteredData, currentPage);

	// Transform data to match component interface
	const transformedData = paginatedResult.data.map((item) => ({
		_id: item.slugtitle,
		title: item.title,
		slugtitle: item.slugtitle,
		headlines: [item.headline],
		slugheadlines: [item.slugheadline],
		summary: [item.summary],
		sources: item.source ? [item.source] : [],
		published: [item.date],
		hashtags: item.hashtags || [],
		img_url: item.img_url || '',
		date: item.date,
	}));

	const categoryName =
		params.category.charAt(0).toUpperCase() + params.category.slice(1);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				<CategoryHeader
					categoryName={categoryName}
					isUnifiedView={isUnifiedView}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
					<div className="lg:col-span-2">
						<CategoryContent
							data={transformedData}
							pagination={paginatedResult.pagination}
							isUnifiedView={isUnifiedView}
							category={params.category}
						/>
					</div>

					<div className="lg:col-span-1">
						<CategorySidebar latestNews={{ data: latestNews }} />
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
