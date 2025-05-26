'use client';
import { NextPage } from 'next';
import Link from 'next/link';
import { IoMenu, IoCloseSharp } from 'react-icons/io5';
import { MdUnsubscribe, MdContactMail } from 'react-icons/md';
import NewsletterPopup from '../newsletter/newsletterPopup';
import { useState } from 'react';

interface Props {}

const categories = [
	{ path: 'ai', label: 'AI' },
	{ path: 'software', label: 'Software' },
	{ path: 'space', label: 'Space' },
	{ path: 'socialmedia', label: 'Social Media' },
	{ path: 'biotechnology', label: 'Biotechnology' },
	{ path: 'gadgets', label: 'Gadgets' },
	{ path: 'videogames', label: 'Video Games' },
	{ path: 'innovations', label: 'Innovations' },
];

const MobHeader: NextPage<Props> = ({}) => {
	const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
	};

	return (
		<div className="md:hidden">
			{/* Mobile Header Bar */}
			<div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
				<div className="flex items-center justify-between px-4 py-3">
					<Link href="/" className="group">
						<h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							TechFrom10
						</h1>
					</Link>

					<button
						onClick={toggleMobileMenu}
						className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
					>
						<IoMenu size={24} className="text-gray-700" />
					</button>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-50">
					<div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
						{/* Close Button */}
						<div className="flex justify-end p-4">
							<button
								onClick={toggleMobileMenu}
								className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
							>
								<IoCloseSharp size={24} className="text-gray-700" />
							</button>
						</div>

						{/* Menu Content */}
						<div className="px-6 py-4 space-y-6">
							{/* Main Navigation */}
							<div className="space-y-4">
								<button
									onClick={() => {
										toggleMobileMenu();
										setIsNewsletterOpen(true);
									}}
									className="flex items-center gap-3 w-full p-3 rounded-xl bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors"
								>
									<MdUnsubscribe size={20} />
									Newsletter
								</button>

								<Link
									href="/aboutus"
									onClick={toggleMobileMenu}
									className="flex items-center gap-3 w-full p-3 rounded-xl bg-gray-50 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
								>
									<MdContactMail size={20} />
									About Us
								</Link>
							</div>

							{/* Categories */}
							<div>
								<h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
									Categories
								</h3>
								<div className="space-y-2">
									{categories.map((category) => (
										<Link
											key={category.path}
											href={`/categories/${category.path}`}
											onClick={toggleMobileMenu}
											className="block p-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
										>
											{category.label}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Newsletter Popup */}
			{isNewsletterOpen && (
				<NewsletterPopup
					onClose={() => setIsNewsletterOpen(false)}
					isOpen={isNewsletterOpen}
					setIsNewsletterOpen={setIsNewsletterOpen}
				/>
			)}
		</div>
	);
};

export default MobHeader;
