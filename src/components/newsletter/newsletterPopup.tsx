'use client';
import { useEffect } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { X, Mail, Sparkles, TrendingUp, Zap } from 'lucide-react';
import SubscribeNewsletter from './subscribeNewsletter';

interface Props {
	onClose: () => void;
	isOpen: boolean;
	setIsNewsletterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewsletterPopup: NextPage<Props> = ({
	onClose,
	isOpen,
	setIsNewsletterOpen,
}) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
				{/* Close Button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
					aria-label="Close newsletter popup"
				>
					<X className="w-5 h-5 text-gray-600" />
				</button>

				<div className="flex flex-col md:flex-row">
					{/* Left Side - Image */}
					<div className="md:w-1/2 relative bg-gradient-to-br from-blue-50 to-indigo-100">
						<div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
						<div className="relative h-64 md:h-full flex items-center justify-center p-8">
							{/* Tech-themed illustration */}
							<div className="text-center">
								<div className="relative mb-6">
									<div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
										<Mail className="w-16 h-16 text-white" />
									</div>
									<div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
										<Sparkles className="w-4 h-4 text-yellow-800" />
									</div>
									<div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
										<TrendingUp className="w-3 h-3 text-green-800" />
									</div>
								</div>

								{/* Floating elements */}
								<div className="absolute top-8 left-8 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
								<div className="absolute bottom-8 right-8 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
								<div className="absolute top-1/2 left-4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
							</div>
						</div>
					</div>

					{/* Right Side - Content */}
					<div className="md:w-1/2 p-8 md:p-12">
						<div className="h-full flex flex-col justify-center">
							{/* Header */}
							<div className="mb-8">
								<div className="flex items-center gap-2 mb-4">
									<span className="text-2xl font-bold text-blue-600">
										TechFrom10
									</span>
									<Zap className="w-6 h-6 text-yellow-500" />
								</div>
								<h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
									Stay Ahead of the Tech Curve
								</h2>
								<p className="text-gray-600 text-lg leading-relaxed">
									Join thousands of tech enthusiasts and get the latest
									insights, trends, and innovations delivered straight to your
									inbox.
								</p>
							</div>

							{/* Benefits */}
							<div className="mb-8 space-y-3">
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									</div>
									<span className="text-gray-700">
										Weekly AI & Tech breakthroughs
									</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
										<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
									</div>
									<span className="text-gray-700">
										Exclusive industry insights
									</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
										<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
									</div>
									<span className="text-gray-700">
										Early access to new content
									</span>
								</div>
							</div>

							{/* Newsletter Form */}
							<div className="mb-6">
								<SubscribeNewsletter
									setIsNewsletterOpen={setIsNewsletterOpen}
								/>
							</div>

							{/* Footer */}
							<div className="text-center">
								<p className="text-sm text-gray-500">
									No spam, unsubscribe anytime. Join{' '}
									<span className="font-semibold text-blue-600">10,000+</span>{' '}
									tech professionals.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom accent */}
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
			</div>
		</div>
	);
};

export default NewsletterPopup;
