import DefaultView from '@/components/defaultView/defaultView';
import UnifiedView from '@/components/uniifiedView/unifiedView';
import { InfiniteScroll } from './InfiniteScroll';
import { DataProps } from '@/types';

interface ContentRendererProps {
	data: DataProps[];
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		itemsPerPage: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
	currentPage: number;
	selectedTags: string[];
	isUnifiedView: boolean;
}

export function ContentRenderer({
	data,
	pagination,
	currentPage,
	selectedTags,
	isUnifiedView,
}: ContentRendererProps) {
	const completeCheck =
		selectedTags.includes('uncategorized') || selectedTags.length === 0;

	return (
		<div className="space-y-6">
			{isUnifiedView ? (
				<UnifiedView data={data} />
			) : (
				<div className="grid gap-6">
					{data.map((item) => (
						<DefaultView
							key={item._id}
							val={item}
							completeCheck={completeCheck}
						/>
					))}
				</div>
			)}

			<InfiniteScroll
				hasNextPage={pagination.hasNextPage}
				currentPage={pagination.currentPage}
				totalItems={pagination.totalItems}
				itemsPerPage={pagination.itemsPerPage}
			/>
		</div>
	);
}
