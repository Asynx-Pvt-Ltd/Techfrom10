'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import dynamic from 'next/dynamic';

const DatePickerComponent = dynamic(
	() => import('@/components/dataPicker/datePicker'),
	{ ssr: false },
);

export function ClientWrapper() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Initialize state based on URL parameters
	const [unifiedView, setUnifiedView] = useState(() => {
		return searchParams.get('view') === 'unified';
	});

	const handleDateChange = (date: any) => {
		const params = new URLSearchParams(searchParams);

		if (date?.from) {
			params.set('from', date.from.toISOString().split('T')[0]);
		} else {
			params.delete('from');
		}

		if (date?.to) {
			params.set('to', date.to.toISOString().split('T')[0]);
		} else {
			params.delete('to');
		}

		params.set('page', '1');
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
			<div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2">
				<span className="text-sm font-medium text-gray-700">Unified View</span>
				<Switch
					checked={unifiedView}
					onCheckedChange={(checked) => {
						setUnifiedView(checked);
						const params = new URLSearchParams(searchParams);
						if (checked) {
							params.set('view', 'unified');
						} else {
							params.delete('view');
						}
						params.set('page', '1');
						router.push(`?${params.toString()}`);
					}}
				/>
			</div>
			<DatePickerComponent onDateChange={handleDateChange} />
		</div>
	);
}
