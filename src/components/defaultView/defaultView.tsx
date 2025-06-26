import { NextPage } from 'next';
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

// Date box with beautiful gradients
const DateBox = ({ dateString }: { dateString: string }) => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleDateString('en-US', { month: 'short' });
	const year = date.getFullYear();

	// Beautiful gradient combinations
	const gradientClasses = [
		'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
		'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
		'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600',
		'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600',
		'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600',
		'bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600',
		'bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600',
		'bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600',
		'bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600',
		'bg-gradient-to-br from-violet-400 via-violet-500 to-violet-600',
		'bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600',
		'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600',
	];

	// Use day of month to consistently select gradient
	const gradientIndex = (day - 1) % gradientClasses.length;
	const selectedGradient = gradientClasses[gradientIndex];

	return (
		<div
			className={`${selectedGradient} rounded-xl p-3 text-white text-center min-w-[80px] shadow-sm`}
		>
			<div className="text-2xl font-bold leading-none">{day}</div>
			<div className="text-xs uppercase tracking-wide mt-1 opacity-90">
				{month}
			</div>
			<div className="text-xs opacity-75">{year}</div>
		</div>
	);
};

const DefaultView: NextPage<Props> = ({ val, completeCheck = false }) => {
	const shouldRender = completeCheck
		? [10, 11].includes(val.headlines.length)
		: true;

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
					<div className="lg:w-20 flex-shrink-0 flex justify-center lg:justify-start h-fit">
						<DateBox dateString={val.date} />
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
