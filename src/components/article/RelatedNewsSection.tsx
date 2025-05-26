import Link from 'next/link';
import RelatedNewsCard from './RelatedNewsCard';
import { ArrowRight } from 'lucide-react';

interface CategoryNews {
	img_url: string;
	headline: string;
	slugheadline: string;
	summary: string;
	source?: string;
}

interface RelatedNewsSectionProps {
	categoryNews: CategoryNews[];
	hashtags: string;
}

export default function RelatedNewsSection({
	categoryNews,
	hashtags,
}: RelatedNewsSectionProps) {
	if (!categoryNews.length) {
		return null;
	}

	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			<div className="mb-8">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold text-gray-900">
						More <span className="text-blue-600 capitalize">{hashtags}</span>{' '}
						News
					</h2>
					<Link
						href={`/categories/${hashtags}`}
						className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group"
					>
						<span>View All</span>
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
					</Link>
				</div>
				<div className="h-px bg-gradient-to-r from-gray-200 to-transparent mt-4"></div>
			</div>

			<div className="grid gap-4 md:gap-6">
				{categoryNews.map((newsItem, index) => (
					<RelatedNewsCard
						key={`${newsItem.slugheadline}-${index}`}
						headline={newsItem.headline}
						slugheadline={newsItem.slugheadline}
						summary={newsItem.summary}
						img_url={newsItem.img_url}
					/>
				))}
			</div>
		</div>
	);
}
