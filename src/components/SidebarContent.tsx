import { SearchBar } from './searchbar/searchBar';
import { NewsCard } from '@/components/newsCard/newsCard';
import { TopicsCard } from './topicsCard/topicsCard';

export async function SidebarContent() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchRoundup`,
		);

		if (!response.ok) {
			throw new Error('Failed to fetch sidebar data');
		}

		const result = await response.json();
		const data = result.data || [];

		const uniqueHashtags: string[] = Array.from(
			new Set(
				data.flatMap(
					(item: any) =>
						item.hashtags?.map((tag: string) => tag.toLowerCase()) || [],
				),
			),
		);

		return (
			<>
				<SearchBar />
				<NewsCard data={data} />
				<TopicsCard uniqueHashtags={uniqueHashtags} />
			</>
		);
	} catch (error) {
		console.error('Error fetching sidebar data:', error);
		return <div>Error loading sidebar content</div>;
	}
}
