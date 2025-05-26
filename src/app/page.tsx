import { Suspense } from 'react';
import Link from 'next/link';
import Footer from '@/components/footer/footer';
import Loading from './loading';
import { ClientWrapper } from '@/components/ClientWrapper';
import { DataFetcher } from '@/components/DataFetcher';
import { SidebarContent } from '@/components/SidebarContent';

export default async function Page({
	searchParams,
}: {
	searchParams: {
		page?: string;
		tags?: string;
		search?: string;
		from?: string;
		to?: string;
		view?: string;
	};
}) {
	const page = parseInt(searchParams.page || '1');
	const selectedTags = searchParams.tags?.split(',') || ['uncategorized'];
	const searchQuery = searchParams.search || '';
	const dateFrom = searchParams.from || '';
	const dateTo = searchParams.to || '';
	const isUnifiedView = searchParams.view === 'unified';

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Main Content */}
					<div className="flex-1 space-y-8">
						{/* Title Bar */}
						<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
								<Link href="/" className="group">
									<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
										Your Tech Round-Up!
									</h1>
								</Link>
								<ClientWrapper />
							</div>
						</div>

						{/* Content Area */}
						<Suspense fallback={<Loading />}>
							<DataFetcher
								page={page}
								selectedTags={selectedTags}
								searchQuery={searchQuery}
								dateFrom={dateFrom}
								dateTo={dateTo}
								isUnifiedView={isUnifiedView}
							/>
						</Suspense>
					</div>

					{/* Sidebar */}
					<div className="lg:w-80 space-y-6">
						<div className="sticky top-8 space-y-6">
							<Suspense fallback={<div>Loading sidebar...</div>}>
								<SidebarContent />
							</Suspense>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
