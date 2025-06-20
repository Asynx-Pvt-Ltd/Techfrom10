'use client';
import './datePicker.scss';
import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerComponentProps {
	onDateChange: (date: DateRange | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
	onDateChange,
}) => {
	const [date, setDate] = React.useState<DateRange | undefined>(undefined);

	const handleDateRangeChange = (selectedDate: DateRange | undefined) => {
		setDate(selectedDate);
		onDateChange(selectedDate || null);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id="date"
					className="calendar-button bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 font-medium rounded-xl px-4 py-2 transition-all duration-300 hover:shadow-md flex items-center gap-2"
				>
					<CalendarIcon className="w-4 h-4" />
					{date?.from ? (
						date.to ? (
							<span className="text-sm">
								{format(date.from, 'MMM dd, yyyy')} -{' '}
								{format(date.to, 'MMM dd, yyyy')}
							</span>
						) : (
							<span className="text-sm">
								{format(date.from, 'MMM dd, yyyy')}
							</span>
						)
					) : (
						<span className="text-sm">Pick a date range</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="date-popover" align="end">
				<Calendar
					mode="range"
					defaultMonth={date?.from}
					selected={date}
					onSelect={handleDateRangeChange}
					numberOfMonths={1}
					className="date-calendar"
				/>
			</PopoverContent>
		</Popover>
	);
};

export default DatePickerComponent;
