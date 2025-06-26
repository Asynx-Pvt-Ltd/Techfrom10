import '@/styles/loadingMain.scss';

export default function Loading() {
	return (
		<div className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-[-25vh]"></div>

			{/* Loading Content */}
			<div className="relative z-10 text-center">
				{/* Logo/Brand */}
				<div className="mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
						<span className="text-white text-2xl font-bold">T</span>
					</div>
					<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						TechFrom10
					</h1>
					<p className="text-gray-500 text-sm mt-1">
						Loading your tech roundup...
					</p>
				</div>

				{/* Animated Loading Indicator */}
				<div className="flex items-center justify-center space-x-2 mb-8">
					{/* Pulsing Dots */}
					<div className="flex space-x-1">
						<div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
						<div
							className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
							style={{ animationDelay: '0.2s' }}
						></div>
						<div
							className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"
							style={{ animationDelay: '0.4s' }}
						></div>
					</div>
				</div>

				{/* Loading Text */}
				<div className="text-sm text-gray-600 space-y-2">
					<p className="animate-pulse">Fetching latest tech news...</p>
				</div>

				{/* Spinner Alternative (Optional) */}
				<div className="mt-8">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-500"></div>
				</div>
				{/* Floating Elements */}
				<>
					<div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
					<div
						className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-bounce"
						style={{ animationDelay: '1s' }}
					></div>
					<div
						className="absolute bottom-32 left-1/4 w-3 h-3 bg-indigo-400 rounded-full opacity-25 animate-bounce"
						style={{ animationDelay: '2s' }}
					></div>
					<div
						className="absolute bottom-20 right-20 w-5 h-5 bg-blue-300 rounded-full opacity-20 animate-bounce"
						style={{ animationDelay: '0.5s' }}
					></div>
				</>
			</div>
		</div>
	);
}
