// components/article/ArticleLoading.tsx
export default function ArticleLoading() {
	return (
		<div className="min-h-screen bg-gray-50">
			<main className="pt-8 pb-16">
				{/* Article Header Skeleton */}
				<div className="max-w-4xl mx-auto px-6 py-8">
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
						<div className="p-8 lg:p-12">
							<div className="space-y-6">
								{/* Headline skeleton */}
								<div className="animate-pulse space-y-3">
									<div className="h-8 bg-gray-200 rounded-xl"></div>
									<div className="h-8 bg-gray-200 rounded-xl w-4/5"></div>
								</div>

								{/* Summary skeleton */}
								<div className="animate-pulse space-y-2 pt-2">
									<div className="h-5 bg-gray-200 rounded"></div>
									<div className="h-5 bg-gray-200 rounded"></div>
									<div className="h-5 bg-gray-200 rounded w-3/4"></div>
								</div>
							</div>

							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
								<div className="animate-pulse">
									<div className="h-4 bg-gray-200 rounded w-32"></div>
								</div>
								<div className="animate-pulse">
									<div className="h-10 bg-gray-200 rounded-xl w-36"></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Related News Section Skeleton */}
				<div className="max-w-4xl mx-auto px-6 py-8">
					<div className="mb-8">
						<div className="flex items-center justify-between">
							<div className="animate-pulse">
								<div className="h-8 bg-gray-200 rounded-xl w-48"></div>
							</div>
							<div className="animate-pulse">
								<div className="h-6 bg-gray-200 rounded w-20"></div>
							</div>
						</div>
						<div className="h-px bg-gray-200 mt-4"></div>
					</div>

					<div className="grid gap-4 md:gap-6">
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className="bg-white rounded-xl border border-gray-100"
							>
								<div className="p-6">
									<div className="flex gap-4">
										<div className="flex-shrink-0">
											<div className="animate-pulse w-20 h-20 bg-gray-200 rounded-xl"></div>
										</div>

										<div className="flex-1 min-w-0">
											<div className="animate-pulse space-y-2">
												<div className="h-4 bg-gray-200 rounded"></div>
												<div className="h-4 bg-gray-200 rounded w-4/5"></div>
												<div className="h-3 bg-gray-200 rounded w-3/4"></div>
												<div className="h-3 bg-gray-200 rounded w-24 mt-3"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
