// src/app/categories/[category]/loading.tsx
export default function CategoryLoading() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				{/* Header Skeleton */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div className="flex items-center gap-4">
							<div className="h-8 w-48 bg-gray-200 rounded"></div>
							<div className="hidden sm:block w-px h-8 bg-gray-300"></div>
							<div className="h-6 w-32 bg-gray-200 rounded"></div>
						</div>
						<div className="flex gap-4">
							<div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
							<div className="h-10 w-40 bg-gray-200 rounded-xl"></div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
					{/* Content Skeleton */}
					<div className="lg:col-span-2 space-y-6">
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-pulse"
							>
								<div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
									<div className="h-5 w-24 bg-gray-200 rounded"></div>
								</div>
								<div className="p-6">
									<div className="flex flex-col lg:flex-row gap-6">
										<div className="lg:w-64 flex-shrink-0">
											<div className="aspect-video lg:aspect-[4/3] w-full bg-gray-200 rounded-xl"></div>
										</div>
										<div className="flex-1 space-y-4">
											{[...Array(3)].map((_, j) => (
												<div key={j} className="p-4 bg-gray-50 rounded-xl">
													<div className="h-5 bg-gray-200 rounded mb-2"></div>
													<div className="h-4 w-3/4 bg-gray-200 rounded"></div>
												</div>
											))}
										</div>
									</div>
									<div className="mt-6 pt-6 border-t border-gray-200">
										<div className="h-10 w-40 bg-gray-200 rounded-xl"></div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Sidebar Skeleton */}
					<div className="lg:col-span-1 space-y-6">
						{/* Search Bar Skeleton */}
						<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 animate-pulse">
							<div className="h-12 bg-gray-200 rounded-xl mb-4"></div>
							<div className="h-10 bg-gray-200 rounded-xl"></div>
						</div>

						{/* Latest News Skeleton */}
						<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
							<div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
							<div className="space-y-3">
								{[...Array(5)].map((_, i) => (
									<div key={i} className="flex gap-3">
										<div className="flex-1">
											<div className="h-4 bg-gray-200 rounded mb-1"></div>
											<div className="h-3 w-16 bg-gray-200 rounded"></div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* CTA Skeleton */}
						<div className="bg-gray-100 rounded-2xl p-6 animate-pulse">
							<div className="h-6 w-24 bg-gray-200 rounded mb-3"></div>
							<div className="h-4 bg-gray-200 rounded mb-4"></div>
							<div className="h-8 w-28 bg-gray-200 rounded-xl"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
