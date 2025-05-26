import { DataProps } from '@/types';
import { ContentRenderer } from './ContentRenderer';

interface DataFetcherProps {
	page: number;
	selectedTags: string[];
	searchQuery: string;
	dateFrom: string;
	dateTo: string;
	isUnifiedView: boolean;
}

export async function DataFetcher({
	page,
	selectedTags,
	searchQuery,
	dateFrom,
	dateTo,
	isUnifiedView,
}: DataFetcherProps) {
	const limit = 10;

	const params = new URLSearchParams({
		page: page.toString(),
		limit: limit.toString(),
	});

	if (selectedTags.length > 0 && !selectedTags.includes('uncategorized')) {
		params.append('tags', selectedTags.join(','));
	}
	if (searchQuery) {
		params.append('search', searchQuery);
	}
	if (dateFrom) {
		params.append('from', dateFrom);
	}
	if (dateTo) {
		params.append('to', dateTo);
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchRoundup?${params}`,
			{
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const result = await response.json();

		return (
			<ContentRenderer
				data={result.data}
				pagination={result.pagination}
				currentPage={page}
				selectedTags={selectedTags}
				isUnifiedView={isUnifiedView}
			/>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return <div>Error loading content. Please try again.</div>;
	}
}
