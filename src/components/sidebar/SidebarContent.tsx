'use client';
import { useEffect, useState } from 'react';
import { NewsCard } from '@/components/newsCard/newsCard';
import { TopicsCard } from '../topicsCard/topicsCard';
import { SearchBar } from '../searchbar/searchBar';

interface SidebarContentProps {
	data: any[];
	uniqueHashtags: string[];
}

export function SidebarContent({ data, uniqueHashtags }: SidebarContentProps) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className={`sticky top-auto space-y-4`}>
			<SearchBar />

			{/* NewsCard - Hidden on scroll */}
			<div
				className={`
					transition-all duration-300 overflow-hidden
					${isScrolled ? 'h-0 opacity-0 pointer-events-none' : 'h-auto opacity-100'}
				`}
			>
				<NewsCard data={data} />
			</div>

			{/* TopicsCard - Moves up on scroll */}
			<div
				className={`
					transition-all duration-300
					${isScrolled ? 'transform -translate-y-2' : 'transform translate-y-0'}
				`}
			>
				<TopicsCard uniqueHashtags={uniqueHashtags} />
			</div>
		</div>
	);
}
