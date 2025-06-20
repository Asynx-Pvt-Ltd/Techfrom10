import { SidebarContent } from './SidebarContent';

export async function SidebarContentWrapper() {
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

		return <SidebarContent data={data} uniqueHashtags={uniqueHashtags} />;
	} catch (error) {
		console.error('Error fetching sidebar data:', error);
		return <div>Error loading sidebar content</div>;
	}
}
