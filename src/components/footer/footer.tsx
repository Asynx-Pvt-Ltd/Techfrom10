import { NextPage } from 'next';
import Link from 'next/link';
import { FaFacebookF, FaYoutube, FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';
import SubscribeNewsletter from '../newsletter/subscribeNewsletter';
import { MutableRefObject } from 'react';

interface Props {
	footerRef?: MutableRefObject<HTMLElement>;
}

const Footer: NextPage<Props> = ({ footerRef }) => {
	return (
		<footer ref={footerRef} className="bg-white border-t border-gray-100 mt-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Brand Section */}
					<div className="lg:col-span-2">
						<Link href="/" className="inline-block mb-4">
							<span className="text-2xl font-bold text-blue-600">
								TechFrom10
							</span>
						</Link>
						<p className="text-gray-600 mb-6 max-w-md">
							Your go-to source for the latest in technology news, AI
							innovations, software updates, and digital trends. Stay informed
							with our comprehensive tech coverage.
						</p>

						{/* Social Links */}
						<div className="flex space-x-4">
							<a
								href="#"
								className="w-10 h-10 bg-gray-100 hover:bg-blue-600 flex items-center justify-center rounded-full text-gray-600 hover:text-white transition-colors duration-200"
								aria-label="Facebook"
							>
								<FaFacebookF size={16} />
							</a>
							<a
								href="#"
								className="w-10 h-10 bg-gray-100 hover:bg-blue-600 flex items-center justify-center rounded-full text-gray-600 hover:text-white transition-colors duration-200"
								aria-label="Twitter"
							>
								<FaXTwitter size={16} />
							</a>
							<a
								href="#"
								className="w-10 h-10 bg-gray-100 hover:bg-blue-600 flex items-center justify-center rounded-full text-gray-600 hover:text-white transition-colors duration-200"
								aria-label="Instagram"
							>
								<AiFillInstagram size={18} />
							</a>
							<a
								href="#"
								className="w-10 h-10 bg-gray-100 hover:bg-blue-600 flex items-center justify-center rounded-full text-gray-600 hover:text-white transition-colors duration-200"
								aria-label="YouTube"
							>
								<FaYoutube size={16} />
							</a>
							<a
								href="#"
								className="w-10 h-10 bg-gray-100 hover:bg-blue-600 flex items-center justify-center rounded-full text-gray-600 hover:text-white transition-colors duration-200"
								aria-label="Telegram"
							>
								<FaTelegramPlane size={16} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Quick Links
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/"
									className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
								>
									Home
								</Link>
							</li>

							<li>
								<Link
									href="/aboutus"
									className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
								>
									About Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Categories */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Categories
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/categories/ai"
									className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
								>
									Artificial Intelligence
								</Link>
							</li>
							<li>
								<Link
									href="/categories/software"
									className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
								>
									Software
								</Link>
							</li>
							<li>
								<Link
									href="/categories/gadgets"
									className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
								>
									Gadgets
								</Link>
							</li>
							<li>
								<Link
									href="/categories/innovations"
									className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
								>
									Innovations
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Newsletter Section */}
				<div className="mt-12 pt-8 border-t border-gray-100">
					<div className="max-w-md">
						<h3 className="text-lg font-semibold text-gray-900 mb-2">
							Stay Updated
						</h3>
						<p className="text-gray-600 mb-4">
							Subscribe to our newsletter for the latest tech news and updates.
						</p>
						<SubscribeNewsletter />
					</div>
				</div>

				{/* Bottom Section */}
				<div className="mt-8 pt-8 border-t border-gray-100 flex justify-center">
					<p className="text-gray-500 text-sm">
						© {new Date().getFullYear()} TechFrom10. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
