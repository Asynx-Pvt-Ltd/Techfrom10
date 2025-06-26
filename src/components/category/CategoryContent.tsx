// src/components/categories/CategoryContent.tsx
import DefaultView from '@/components/defaultView/defaultView';
import UnifiedView from '@/components/uniifiedView/unifiedView';
import { LoadMore } from '@/components/LoadMore';
import { DataProps } from '@/types';

interface CategoryContentProps {
	data: DataProps[];
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		itemsPerPage: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
	isUnifiedView: boolean;
	category: string;
}

export function CategoryContent({
	data,
	pagination,
	isUnifiedView,
	category,
}: CategoryContentProps) {
	if (data.length === 0) {
		return (
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
				<div className="max-w-md mx-auto">
					<div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
						<svg
							className="w-8 h-8 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.94-6.071 2.469l-.028.03v-3.012A8.962 8.962 0 0112 12a8.962 8.962 0 016.071 2.469l.028.03v3.012A7.962 7.962 0 0112 15z"
							/>
						</svg>
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						No articles found
					</h3>
					<p className="text-gray-600">
						No articles match your current filters. Try adjusting your search or
						date range.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{isUnifiedView ? (
				<UnifiedView data={data} />
			) : (
				<div className="space-y-6">
					{data.map((item) => (
						<DefaultView key={item._id} val={item} completeCheck={false} />
					))}
				</div>
			)}

			<LoadMore
				hasNextPage={pagination.hasNextPage}
				currentPage={pagination.currentPage}
				totalItems={pagination.totalItems}
				itemsPerPage={pagination.itemsPerPage}
			/>
		</div>
	);
}
