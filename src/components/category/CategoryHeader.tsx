import Link from 'next/link';
import { ClientWrapper } from '../ClientWrapper';

interface CategoryHeaderProps {
	categoryName: string;
	isUnifiedView: boolean;
}

export function CategoryHeader({
	categoryName,
	isUnifiedView,
}: CategoryHeaderProps) {
	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<Link
						href="/"
						className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
					>
						Your Tech Round-Up!
					</Link>
					<div className="hidden sm:block w-px h-8 bg-gray-300"></div>
					<h1 className="text-xl font-semibold text-gray-800">
						{categoryName} News
					</h1>
				</div>

				<ClientWrapper />
			</div>
		</div>
	);
}
