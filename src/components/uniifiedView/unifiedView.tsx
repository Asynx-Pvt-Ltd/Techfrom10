import React from 'react';
import Link from 'next/link';
import { FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import generateSlug, { removeAsterisks } from '@/helper/slugFormat';
import dateFormat from '@/helper/dateFormat';

interface UnifiedViewProps {
	data: {
		_id: string;
		headlines: string[];
		slugheadlines: string[];
		published: string[];
		sources: string[];
	}[];
}

const UnifiedView: React.FC<UnifiedViewProps> = ({ data }) => {
	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
			<div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
				<h2 className="text-xl font-semibold text-gray-800">All Headlines</h2>
			</div>

			<div className="p-6">
				<ul className="space-y-3">
					{data.map((val) =>
						val.headlines.map((headline, hindex) => (
							<li key={`headline-${val._id}-${hindex}`} className="group">
								<div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
									<div className="flex-1">
										<Link
											href={`/article/${generateSlug(headline)}`}
											title="view article"
											className="text-gray-800 hover:text-blue-600 transition-colors font-medium leading-relaxed block mb-1"
										>
											{removeAsterisks(headline)}
										</Link>
										<span className="text-sm text-gray-500">
											{dateFormat(val.published[hindex])}
										</span>
									</div>

									<div className="flex gap-2 items-center opacity-60 group-hover:opacity-100 transition-opacity">
										<Link
											href={`/article/${generateSlug(headline)}`}
											title="view article"
											className="p-2 rounded-xl hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
										>
											<FaEye className="text-sm" />
										</Link>
										<Link
											href={val.sources[hindex] ? val.sources[hindex] : '#'}
											target="_blank"
											rel="noreferrer nofollow noopener"
											title="view full info"
											className="p-2 rounded-xl hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
										>
											<FaExternalLinkAlt className="text-xs" />
										</Link>
									</div>
								</div>
							</li>
						)),
					)}
				</ul>
			</div>
		</div>
	);
};

export default UnifiedView;
