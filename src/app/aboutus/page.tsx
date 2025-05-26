import Footer from '@/components/footer/footer';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
	Users,
	Target,
	Zap,
	Mail,
	ExternalLink,
	Clock,
	Globe,
	TrendingUp,
} from 'lucide-react';

interface Props {}

export const metadata: Metadata = {
	title: 'About us - techfrom10',
	description:
		"Every day, we pick the 10 most important tech stories from trusted sources, giving you a quick update on what's happening in the techworld.",
};

const partnersInfo = [
	{
		image: '/partners/openai-icon.png',
		name: 'OpenAI',
		link: 'https://openai.com',
	},
	{
		image: '/partners/5app-icon.png',
		name: '5APP AI',
		link: 'https://5app.ai/',
	},
	{
		image: '/partners/vercel-icon.png',
		name: 'Vercel',
		link: 'https://vercel.com/',
	},
	{
		image: '/partners/bing-icon.png',
		name: 'Bing',
		link: 'https://www.bing.com/',
	},
	{
		image: '/partners/gemini-icon.svg',
		name: 'Gemini',
		link: 'https://gemini.google.com/app',
	},
	{
		image: '/partners/lenos-icon.png',
		name: 'Lenostube',
		link: 'https://www.lenostube.com/en/',
	},
	{
		image: '/partners/asura-icon.png',
		name: 'Asura Hosting',
		link: 'https://www.asurahosting.com/',
	},
	{
		image: '/partners/oxy-icon.jpg',
		name: 'Oxylabs',
		link: 'https://oxylabs.io/',
	},
];

type StatColor = 'blue' | 'green' | 'purple' | 'orange';

const stats: {
	icon: React.ElementType;
	number: string;
	label: string;
	color: StatColor;
}[] = [
	{
		icon: Users,
		number: '10K+',
		label: 'Daily Readers',
		color: 'blue',
	},
	{
		icon: Globe,
		number: '50+',
		label: 'Countries Reached',
		color: 'green',
	},
	{
		icon: TrendingUp,
		number: '10',
		label: 'Top Stories Daily',
		color: 'purple',
	},
	{
		icon: Clock,
		number: '2min',
		label: 'Average Read Time',
		color: 'orange',
	},
];

const features = [
	{
		icon: Target,
		title: 'Curated Content',
		description:
			'We handpick the 10 most important tech stories from trusted sources every single day.',
	},
	{
		icon: Clock,
		title: 'Time Efficient',
		description:
			'Stay informed in just a few seconds of reading. Get key information without the time investment.',
	},
	{
		icon: Zap,
		title: 'Clean & Simple',
		description:
			'Our website is designed with a clean, intuitive layout that makes finding news effortless.',
	},
];

const Page: NextPage<Props> = ({}) => {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
							<Zap className="w-4 h-4" />
							About TechFrom10
						</div>
						<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
							Tech News,{' '}
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Simplified
							</span>
						</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Every day, we curate the 10 most important tech stories from
							trusted sources, delivering quick updates on what's happening in
							the tech world.
						</p>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => {
							const IconComponent = stat.icon;
							const colorClasses = {
								blue: 'bg-blue-50 text-blue-600 border-blue-200',
								green: 'bg-green-50 text-green-600 border-green-200',
								purple: 'bg-purple-50 text-purple-600 border-purple-200',
								orange: 'bg-orange-50 text-orange-600 border-orange-200',
							};

							return (
								<div key={index} className="text-center">
									<div
										className={`w-16 h-16 mx-auto mb-4 rounded-2xl border-2 flex items-center justify-center ${
											colorClasses[stat.color]
										}`}
									>
										<IconComponent className="w-8 h-8" />
									</div>
									<div className="text-3xl font-bold text-gray-900 mb-2">
										{stat.number}
									</div>
									<div className="text-gray-600 font-medium">{stat.label}</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* About Content */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						{/* Content */}
						<div>
							<h2 className="text-4xl font-bold text-gray-900 mb-8">
								Who We Are
							</h2>
							<div className="prose prose-lg text-gray-600 space-y-6">
								<p>
									Every day, we pick the 10 most important tech stories from
									trusted sources, giving you a quick update on what's happening
									in the tech world.
								</p>
								<p>
									Our goal is to help you stay informed with just a few seconds
									of reading each day. We focus on delivering only the most
									relevant news, so you get the key information without spending
									too much time.
								</p>
								<p>
									The website is designed to be easy to use, with a clean and
									simple layout. The goal is to share the top technology news in
									a simple and clear way.
								</p>
								<p>
									Whether you love tech or just want to keep up with the latest
									trends, TechFrom10 gives you the essential news without any
									extra fluff.
								</p>
							</div>
						</div>

						{/* Features */}
						<div className="space-y-8">
							{features.map((feature, index) => {
								const IconComponent = feature.icon;
								return (
									<div key={index} className="flex gap-4">
										<div className="flex-shrink-0">
											<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
												<IconComponent className="w-6 h-6 text-blue-600" />
											</div>
										</div>
										<div>
											<h3 className="text-xl font-semibold text-gray-900 mb-2">
												{feature.title}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												{feature.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Partners Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Our Partners
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							We collaborate with industry leaders to bring you the most
							accurate and timely tech news.
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
						{partnersInfo.map((partner, index) => (
							<Link
								key={index}
								href={partner.link}
								target="_blank"
								rel="noopener noreferrer"
								className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
							>
								<div className="relative w-16 h-16 mx-auto mb-4">
									<Image
										src={partner.image}
										alt={partner.name}
										fill
										className="object-contain rounded-xl"
									/>
								</div>
								<h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
									{partner.name}
								</h3>
								<ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 mx-auto transition-colors" />
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Partnership CTA */}
			<section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
						<Mail className="w-16 h-16 text-white mx-auto mb-6 opacity-90" />
						<h3 className="text-3xl font-bold text-white mb-4">
							Become Our Partner
						</h3>
						<p className="text-xl text-blue-100 mb-8 leading-relaxed">
							Interested in partnering with us and being featured on this page?
							We'd love to collaborate with innovative tech companies.
						</p>
						<Link
							href="mailto:contact@techfrom10.com?subject=Partnership"
							className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 hover:scale-105 shadow-lg"
						>
							<Mail className="w-5 h-5" />
							contact@techfrom10.com
						</Link>
						<p className="text-blue-100 text-sm mt-4">
							Please include "Partnership" in the subject line
						</p>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Page;
