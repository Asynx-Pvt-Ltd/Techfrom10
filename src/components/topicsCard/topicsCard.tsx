'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface TopicsCardProps {
	uniqueHashtags: string[];
}

export function TopicsCard({ uniqueHashtags }: TopicsCardProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const selectedTags = searchParams.get('tags')?.split(',') || [
		'uncategorized',
	];

	const handleTagSelection = (hashtag: string) => {
		const params = new URLSearchParams(searchParams);
		let newTags: string[];

		if (hashtag === 'uncategorized') {
			newTags = ['uncategorized'];
		} else {
			if (selectedTags.includes(hashtag)) {
				newTags = selectedTags.filter((tag) => tag !== hashtag);
			} else {
				newTags = [
					...selectedTags.filter((tag) => tag !== 'uncategorized'),
					hashtag,
				];
			}
		}

		if (newTags.length === 0 || newTags.includes('uncategorized')) {
			params.delete('tags');
		} else {
			params.set('tags', newTags.join(','));
		}

		params.set('page', '1'); // Reset to first page
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
			<h3 className="text-lg font-semibold mb-4">Topics</h3>
			<div className="flex flex-wrap gap-2">
				<button
					onClick={() => handleTagSelection('uncategorized')}
					className={`px-3 py-1 rounded-full text-sm transition-colors ${
						selectedTags.includes('uncategorized')
							? 'bg-blue-600 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
					}`}
				>
					All
				</button>
				{uniqueHashtags.map((tag) => (
					<button
						key={tag}
						onClick={() => handleTagSelection(tag)}
						className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
							selectedTags.includes(tag)
								? 'bg-blue-600 text-white'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
						}`}
					>
						{tag}
					</button>
				))}
			</div>
		</div>
	);
}
