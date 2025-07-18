'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
	const [isChecked, setIsChecked] = React.useState(props.checked || false);

	React.useEffect(() => {
		setIsChecked(props.checked || false);
	}, [props.checked]);

	return (
		<SwitchPrimitives.Root
			className={cn(
				'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-gray-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			style={{
				background: isChecked
					? 'linear-gradient(to right, #2563eb, #9333ea)'
					: 'transparent',
			}}
			onCheckedChange={(checked) => {
				setIsChecked(checked);
				props.onCheckedChange?.(checked);
			}}
			{...props}
			ref={ref}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
				)}
			/>
		</SwitchPrimitives.Root>
	);
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
