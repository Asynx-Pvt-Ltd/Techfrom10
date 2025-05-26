import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Footer from '@/components/footer/footer';
import ArticleHeader from '@/components/article/ArticleHeader';
import RelatedNewsSection from '@/components/article/RelatedNewsSection';
import { getArticlePageData, fetchArticleData } from '@/lib/articleService';

interface Params {
	headline: string;
}

interface Props {
	params: Promise<Params>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { headline } = await params;
	const article = await fetchArticleData(headline);

	if (!article) {
		return {
			title: 'Article Not Found - TechFrom10',
			description: 'The requested article could not be found.',
		};
	}

	return {
		title: `${article.headline} - TechFrom10`,
		description: article.summary,
		openGraph: {
			title: article.headline,
			description: article.summary,
			type: 'article',
			publishedTime: article.published,
			images: article.img_url ? [{ url: article.img_url }] : [],
		},
		twitter: {
			card: 'summary_large_image',
			title: article.headline,
			description: article.summary,
			images: article.img_url ? [article.img_url] : [],
		},
	};
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
	const { headline } = await params;
	const pageData = await getArticlePageData(headline);

	if (!pageData) {
		notFound();
	}

	const { article, categoryNews } = pageData;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Article Content */}
			<main className="pt-8 pb-16">
				<ArticleHeader
					headline={article.headline}
					summary={article.summary}
					published={article.published}
					source={article.source}
				/>

				{/* Related News Section */}
				<RelatedNewsSection
					categoryNews={categoryNews}
					hashtags={article.hashtags}
				/>
			</main>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default ArticlePage;
