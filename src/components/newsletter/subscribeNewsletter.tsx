'use client';
import { useState } from 'react';
import { NextPage } from 'next';
import { useToast } from '../ui/use-toast';
import { Mail, Send } from 'lucide-react';

interface SubscribeProps {
	setIsNewsletterOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	variant?: 'default' | 'footer' | 'inline';
}

const SubscribeNewsletter: NextPage<SubscribeProps> = ({
	setIsNewsletterOpen,
	variant = 'default',
}) => {
	const { toast } = useToast();
	const [email, setEmail] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const validateEmail = (email: string): boolean => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateEmail(email)) {
			toast({
				title: 'Invalid Email',
				description: 'Please enter a valid email address.',
				variant: 'destructive',
			});
			return;
		}

		setIsLoading(true);

		try {
			const res = await fetch(
				(process.env.NEXT_PUBLIC_API_BASE_URL as string) + '/api/subscribe',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				},
			);

			if (res.status === 409) {
				toast({
					title: 'Already Subscribed',
					description: 'This email is already subscribed to our newsletter.',
					variant: 'destructive',
				});
				setEmail('');
			} else if (res.status === 201) {
				toast({
					title: 'Successfully Subscribed! 🎉',
					description:
						'Welcome to our tech community! Check your inbox for confirmation.',
					variant: 'default',
				});
				setEmail('');
				if (setIsNewsletterOpen) {
					setIsNewsletterOpen(false);
				}
			} else {
				throw new Error('Subscription failed');
			}
		} catch (error) {
			toast({
				title: 'Subscription Failed',
				description: 'Something went wrong. Please try again later.',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Different variants for different use cases
	const getVariantStyles = () => {
		switch (variant) {
			case 'footer':
				return {
					container: 'flex flex-col sm:flex-row gap-2 max-w-md',
					input:
						'flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm',
					button:
						'px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]',
				};
			case 'inline':
				return {
					container: 'flex gap-2 max-w-sm',
					input:
						'flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm',
					button:
						'px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed',
				};
			default:
				return {
					container: 'space-y-4',
					input:
						'w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-500',
					button:
						'w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed',
				};
		}
	};

	const styles = getVariantStyles();

	return (
		<form onSubmit={handleSubmit} className={styles.container}>
			<div className="relative flex-1">
				<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
				<input
					type="email"
					placeholder="Enter your email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={`${styles.input} ${variant === 'default' ? 'pl-10' : ''}`}
					required
					disabled={isLoading}
				/>
			</div>
			<button type="submit" disabled={isLoading} className={styles.button}>
				{isLoading ? (
					<>
						<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
						{variant === 'default' && 'Subscribing...'}
					</>
				) : (
					<>
						<Send className="w-4 h-4" />
						{variant === 'footer'
							? 'Subscribe'
							: variant === 'inline'
							? 'Join'
							: 'Subscribe to Newsletter'}
					</>
				)}
			</button>
		</form>
	);
};

export default SubscribeNewsletter;
