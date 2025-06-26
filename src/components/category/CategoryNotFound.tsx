// src/app/categories/[category]/not-found.tsx
import Link from 'next/link';

export default function CategoryNotFound() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
			<div className="max-w-md mx-auto text-center px-4">
				<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
					<div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
						<svg
							className="w-8 h-8 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
					</div>

					<h1 className="text-2xl font-bold text-gray-900 mb-2">
						Category Not Found
					</h1>

					<p className="text-gray-600 mb-6">
						The category you're looking for doesn't exist or has been moved.
					</p>

					<div className="space-y-3">
						<Link
							href="/"
							className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 w-full justify-center"
						>
							Go to Homepage
						</Link>

						<button
							onClick={() => window.history.back()}
							className="inline-flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors w-full justify-center"
						>
							Go Back
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
