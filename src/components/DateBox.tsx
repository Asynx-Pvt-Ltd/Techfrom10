const DateBox = ({ dateString }: { dateString: string }) => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleDateString('en-US', { month: 'short' });
	const year = date.getFullYear();

	// Beautiful gradient combinations
	const gradientClasses = [
		'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
		'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
		'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600',
		'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600',
		'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600',
		'bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600',
		'bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600',
		'bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600',
		'bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600',
		'bg-gradient-to-br from-violet-400 via-violet-500 to-violet-600',
		'bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600',
		'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600',
	];

	// Use day of month to consistently select gradient
	const gradientIndex = (day - 1) % gradientClasses.length;
	const selectedGradient = gradientClasses[gradientIndex];

	return (
		<div
			className={`${selectedGradient} rounded-xl p-3 text-white text-center min-w-[80px] shadow-sm`}
		>
			<div className="text-2xl font-bold leading-none">{day}</div>
			<div className="text-xs uppercase tracking-wide mt-1 opacity-90">
				{month}
			</div>
			<div className="text-xs opacity-75">{year}</div>
		</div>
	);
};

export default DateBox;
