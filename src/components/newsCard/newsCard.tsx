import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { removeAsterisks } from '@/helper/slugFormat';
import { DataProps } from '@/types';

interface NewsCardProps {
	data: DataProps[];
}

export const NewsCard: React.FC<NewsCardProps> = ({ data }) => {
	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
			<div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
				<h3 className="text-lg font-semibold text-gray-800">Today's News</h3>
			</div>

			<div className="p-6">
				<div className="space-y-3">
					{data
						.slice()
						.reverse()
						.slice(1, 11)
						.map((element) => (
							<div
								className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
								key={`news-${element._id}`}
							>
								<Link
									className="flex-1 text-gray-800 hover:text-blue-600 transition-colors font-medium leading-relaxed line-clamp-2"
									href={`/post/${encodeURIComponent(
										element.slugtitle.replaceAll(' ', '-'),
									)}`}
								>
									{removeAsterisks(element.title)}
								</Link>

								<Link
									href={`/post/${encodeURIComponent(
										element.slugtitle.replaceAll(' ', '-'),
									)}`}
									className="p-2 rounded-xl hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors opacity-60 group-hover:opacity-100"
								>
									<FaExternalLinkAlt className="text-xs" />
								</Link>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
