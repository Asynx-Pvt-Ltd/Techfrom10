'use client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NewsletterPopup from '../newsletter/newsletterPopup';
import MobHeader from './mobHeader';

interface Props {}

const Header: NextPage<Props> = ({}) => {
	const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const categories = [
		{ key: '1', label: 'Software', route: 'software' },
		{ key: '2', label: 'AI', route: 'ai' },
		{ key: '3', label: 'Space', route: 'space' },
		{ key: '4', label: 'Social Media', route: 'socialmedia' },
		{ key: '5', label: 'Biotechnology', route: 'biotechnology' },
		{ key: '6', label: 'Gadgets', route: 'gadgets' },
		{ key: '7', label: 'Video Games', route: 'videogames' },
		{ key: '8', label: 'Innovations', route: 'innovations' },
	];

	return (
		<div className="relative">
			<header
				className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md
          ${
						isScrolled
							? 'bg-white/90 shadow-lg border-b border-gray-200'
							: 'bg-white/80'
					}
        `}
			>
				{/* Main Navigation */}
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center space-x-8">
							<Link href="/" className="group">
								<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
									TechFrom10
								</h1>
							</Link>

							<nav className="hidden lg:flex items-center space-x-6">
								<Link
									href="/"
									className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
								>
									Home
								</Link>
								<button
									onClick={() => setIsNewsletterOpen(true)}
									className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
								>
									Newsletter
								</button>
								<Link
									href="/aboutus"
									className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
								>
									About Us
								</Link>
							</nav>
						</div>
					</div>
				</div>

				{/* Categories Bar */}
				<div
					className={`
            transition-all duration-300 overflow-hidden
            ${
							isScrolled
								? 'h-0 opacity-0 border-t-0'
								: 'h-auto opacity-100 border-t border-gray-200 bg-white/95 backdrop-blur-sm'
						}
          `}
				>
					<div className="container mx-auto px-4">
						<nav className="hidden lg:flex items-center space-x-1 py-3 overflow-x-auto">
							{categories.map((category) => (
								<Link
									key={category.key}
									href={`/categories/${category.route
										.toLowerCase()
										.replace(/\s+/g, '-')}`}
									className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 whitespace-nowrap"
								>
									{category.label}
								</Link>
							))}
						</nav>
					</div>
				</div>
			</header>

			{/* Spacer to prevent content overlap */}
			<div
				className={`${
					isScrolled ? 'h-36' : 'h-28'
				} transition-all duration-300`}
			/>

			{isNewsletterOpen && (
				<NewsletterPopup
					onClose={() => setIsNewsletterOpen(false)}
					isOpen={isNewsletterOpen}
					setIsNewsletterOpen={setIsNewsletterOpen}
				/>
			)}

			<MobHeader />
		</div>
	);
};

export default Header;
