'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
	hasNextPage: boolean;
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
}

export function InfiniteScroll({
	hasNextPage,
	currentPage,
	totalItems,
	itemsPerPage,
}: InfiniteScrollProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);
	const loadingRef = useRef(false);

	useEffect(() => {
		const handleScroll = () => {
			// Check if we're near the bottom of the page
			const scrollTop = document.documentElement.scrollTop;
			const scrollHeight = document.documentElement.scrollHeight;
			const clientHeight = document.documentElement.clientHeight;

			// Trigger when we're 200px from the bottom
			if (scrollTop + clientHeight >= scrollHeight - 200) {
				if (hasNextPage && !loadingRef.current) {
					loadingRef.current = true;
					setIsLoading(true);

					const params = new URLSearchParams(searchParams);
					params.set('page', (currentPage + 1).toString());

					// Use replace to avoid adding to browser history
					router.replace(`?${params.toString()}`, { scroll: false });
				}
			}
		};

		// Throttle scroll events
		let timeoutId: NodeJS.Timeout;
		const throttledScroll = () => {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(handleScroll, 100);
		};

		window.addEventListener('scroll', throttledScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', throttledScroll);
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [hasNextPage, currentPage, searchParams, router]);

	// Reset loading state when page changes
	useEffect(() => {
		setIsLoading(false);
		loadingRef.current = false;
	}, [currentPage]);

	return (
		<div className="py-8">
			<div className="text-center text-sm text-gray-600 mb-4">
				Showing {Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
				{totalItems} posts
			</div>

			{isLoading && hasNextPage && (
				<div className="flex justify-center items-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
					<span className="ml-3 text-gray-600">Loading more posts...</span>
				</div>
			)}

			{!hasNextPage && totalItems > 0 && (
				<div className="text-center text-gray-500 py-4">
					You've reached the end! No more posts to load.
				</div>
			)}
		</div>
	);
}
