'use client';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { SearchBar } from '@/components/searchbar/searchBar';
import { useState } from 'react';
import NewsletterPopup from '../newsletter/newsletterPopup';

interface CategorySidebarProps {
	latestNews: any;
}

export function CategorySidebar({ latestNews }: CategorySidebarProps) {
	const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
	const newsItems = latestNews?.data?.data || [];

	return (
		<div className="space-y-6">
			<SearchBar />

			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
				<h3 className="text-lg font-semibold text-gray-800 mb-4">
					Latest News
				</h3>

				<div className="space-y-3">
					{newsItems.map((article: any) => (
						<Link
							key={article._id}
							href={`/post/${encodeURIComponent(
								article.slugtitle.replaceAll(' ', '-'),
							)}`}
							target="_blank"
							className="group flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
						>
							<div className="flex-1 min-w-0">
								<h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">
									{article.title}
								</h4>
								<p className="text-xs text-gray-500 mt-1">{article.date}</p>
							</div>

							<div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
								<FaExternalLinkAlt className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
							</div>
						</Link>
					))}
				</div>

				{newsItems.length === 0 && (
					<div className="text-center py-8">
						<p className="text-gray-500">No latest news available</p>
					</div>
				)}
			</div>

			<div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
				<h3 className="text-lg font-semibold text-gray-800 mb-3">
					Stay Updated
				</h3>
				<p className="text-sm text-gray-600 mb-4">
					Get the latest tech news and insights delivered to your inbox.
				</p>
				<button
					className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm"
					onClick={() => setIsNewsletterOpen(true)}
				>
					Subscribe Now
				</button>
				{isNewsletterOpen && (
					<NewsletterPopup
						onClose={() => setIsNewsletterOpen(false)}
						isOpen={isNewsletterOpen}
						setIsNewsletterOpen={setIsNewsletterOpen}
					/>
				)}
			</div>
		</div>
	);
}
