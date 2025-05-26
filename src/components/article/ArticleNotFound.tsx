import Link from 'next/link';
import Footer from '@/components/footer/footer';

export default function ArticleNotFound() {
	return (
		<div className="article-main">
			<div className="article-container">
				<div className="article-content">
					<div className="article-content-sub">
						<h1>Article Not Found</h1>
						<p>
							Sorry, we couldn't find the article you're looking for. It may
							have been moved, deleted, or the URL might be incorrect.
						</p>
					</div>
					<div className="article-extra">
						<Link
							href="/"
							className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
						>
							← Back to Home
						</Link>
					</div>
				</div>
			</div>

			<div className="article-footer">
				<Footer />
			</div>
		</div>
	);
}
