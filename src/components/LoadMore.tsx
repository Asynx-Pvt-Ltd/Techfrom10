'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

interface LoadMoreProps {
	hasNextPage: boolean;
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
}

export function LoadMore({
	hasNextPage,
	currentPage,
	totalItems,
	itemsPerPage,
}: LoadMoreProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = () => {
		if (!hasNextPage || isLoading) return;

		setIsLoading(true);

		startTransition(() => {
			const params = new URLSearchParams(searchParams);
			params.set('page', (currentPage + 1).toString());

			router.replace(`?${params.toString()}`, { scroll: false });
		});

		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	const isButtonLoading = isLoading || isPending;

	return (
		<div className="py-8">
			<div className="text-center text-sm text-gray-600 mb-6">
				Showing {Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
				{totalItems} posts
			</div>

			{hasNextPage && (
				<div className="flex justify-center">
					<button
						onClick={handleLoadMore}
						disabled={isButtonLoading}
						className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						{isButtonLoading ? (
							<>
								<div className="animate-spin rounded-xl h-4 w-4 border-b-2 border-white mr-2"></div>
								Loading...
							</>
						) : (
							<>
								Load More Posts
								<svg
									className="ml-2 h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</>
						)}
					</button>
				</div>
			)}

			{!hasNextPage && totalItems > 0 && (
				<div className="text-center text-gray-500 py-4 border-t border-gray-200">
					<div className="flex items-center justify-center">
						<div className="flex-grow h-px bg-gray-200"></div>
						<span className="px-4 text-sm font-medium">
							You've reached the end!
						</span>
						<div className="flex-grow h-px bg-gray-200"></div>
					</div>
					<p className="mt-2 text-xs">No more posts to load.</p>
				</div>
			)}
		</div>
	);
}
