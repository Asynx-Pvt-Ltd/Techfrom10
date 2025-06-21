import Link from 'next/link';
import Image from 'next/image';
import { removeAsterisks } from '@/helper/slugFormat';
import { ArrowRight } from 'lucide-react';

interface RelatedNewsCardProps {
	headline: string;
	slugheadline: string;
	summary: string;
	img_url?: string;
}

export default function RelatedNewsCard({
	headline,
	slugheadline,
	summary,
	img_url,
}: RelatedNewsCardProps) {
	return (
		<div className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
			<Link href={`/article/${encodeURIComponent(slugheadline)}`}>
				<div className="p-6">
					<div className="flex gap-4">
						<div className="flex-1 min-w-0">
							<h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
								{removeAsterisks(headline.replaceAll('-', ' '))}
							</h3>
							<p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
								{summary}
							</p>
							<div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
								<span>Continue Reading</span>
								<ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
