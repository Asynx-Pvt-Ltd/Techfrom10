import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import generateSlug, { removeAsterisks } from '@/helper/slugFormat';

interface Props {
	isComplete?: boolean;
	completeCheck?: boolean;
	val: {
		_id: string;
		title: string;
		slugtitle: string;
		headlines: string[];
		slugheadlines: string[];
		summary: string[];
		sources: string[];
		published: string[];
		hashtags: string[];
		img_url: string;
		date: string;
	};
}

const DefaultView: NextPage<Props> = ({ val, completeCheck = false }) => {
	const shouldRender = completeCheck ? val.headlines.length === 11 : true;

	return shouldRender ? (
		<div
			className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
			key={val._id}
		>
			<div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
				<div className="flex items-center gap-2 text-gray-600">
					<FaClock className="text-sm" />
					<span className="text-sm font-medium">{val.date}</span>
				</div>
			</div>

			<div className="p-6">
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="lg:w-64 flex-shrink-0">
						<div className="relative aspect-video lg:aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100">
							<Image
								src={val.img_url ? `${val.img_url}` : '/test.jpg'}
								fill
								className="object-cover"
								alt={val.title}
							/>
						</div>
					</div>

					<div className="flex-1">
						<ul className="space-y-4">
							{val.headlines.map((h, hindex) => (
								<li key={`headline-${val._id}-${hindex}`} className="group">
									<div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
										<Link
											href={`/article/${generateSlug(h)}`}
											rel="noreferrer nofollow noopener"
											title="view article"
											className="flex-1 text-gray-800 hover:text-blue-600 transition-colors font-medium leading-relaxed"
										>
											<span className="text-blue-600 font-semibold mr-2">
												{hindex + 1}.
											</span>
											{removeAsterisks(h)}
										</Link>

										<div className="flex gap-2 items-center opacity-60 group-hover:opacity-100 transition-opacity">
											<Link
												href={`/article/${generateSlug(h)}`}
												title="view article"
												key={`view-${val._id}-${hindex}`}
												className="p-2 rounded-xl hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
											>
												<FaEye className="text-sm" />
											</Link>
											<Link
												href={val.sources[hindex] ? val.sources[hindex] : '#'}
												target="_blank"
												rel="noreferrer nofollow noopener"
												title="view full info"
												key={`source-${val._id}-${hindex}`}
												className="p-2 rounded-xl hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
											>
												<FaExternalLinkAlt className="text-xs" />
											</Link>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-6 pt-6 border-t border-gray-200">
					<Link
						href={'/post/' + val.slugtitle}
						className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
					>
						Read Full Article
					</Link>
				</div>
			</div>
		</div>
	) : null;
};

export default DefaultView;
