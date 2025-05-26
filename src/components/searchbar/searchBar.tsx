'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';

export function SearchBar() {
	const [searchQuery, setSearchQuery] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	// Initialize search query from URL params on component mount
	useEffect(() => {
		const currentSearch = searchParams.get('search') || '';
		setSearchQuery(currentSearch);
	}, [searchParams]);

	const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isSearching) return; // Prevent multiple submissions

		setIsSearching(true);

		try {
			const params = new URLSearchParams(searchParams);

			if (searchQuery.trim()) {
				params.set('search', searchQuery.trim());
			} else {
				params.delete('search');
			}

			params.set('page', '1'); // Reset to first page
			router.push(`?${params.toString()}`);
		} finally {
			// Small delay to show loading state
			setTimeout(() => setIsSearching(false), 500);
		}
	};

	const handleSearchReset = () => {
		setSearchQuery('');
		const params = new URLSearchParams(searchParams);
		params.delete('search');
		params.set('page', '1');
		router.push(`?${params.toString()}`);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		// Allow Escape to clear search
		if (event.key === 'Escape') {
			if (searchQuery) {
				setSearchQuery('');
			} else {
				handleSearchReset();
			}
		}
	};

	const hasActiveSearch = searchParams.get('search');

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
			<form onSubmit={handleSearch} className="space-y-4">
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						{isSearching ? (
							<Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
						) : (
							<Search className="h-5 w-5 text-gray-400" />
						)}
					</div>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Search articles, headlines, sources..."
						disabled={isSearching}
						className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-500"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => setSearchQuery('')}
							className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
						>
							<X className="h-5 w-5 text-gray-400" />
						</button>
					)}
				</div>

				{hasActiveSearch && (
					<div className="flex items-center justify-between text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-xl">
						<span>
							Searching for:{' '}
							<span className="font-medium text-blue-700">
								"{hasActiveSearch}"
							</span>
						</span>
						<button
							type="button"
							onClick={handleSearchReset}
							className="text-blue-600 hover:text-blue-800 font-medium"
						>
							Clear
						</button>
					</div>
				)}

				<div className="flex gap-2">
					<button
						type="submit"
						disabled={isSearching || !searchQuery.trim()}
						className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center gap-2"
					>
						{isSearching ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Searching...
							</>
						) : (
							<>
								<Search className="h-4 w-4" />
								Search
							</>
						)}
					</button>

					{(searchQuery || hasActiveSearch) && (
						<button
							type="button"
							onClick={handleSearchReset}
							disabled={isSearching}
							className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
						>
							<X className="h-4 w-4" />
							Reset
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
