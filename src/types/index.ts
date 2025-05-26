export interface DataProps {
	_id: string;
	title: string;
	slugtitle: string;
	headlines: string[];
	slugheadlines: string[];
	summary: string[];
	sources: string[];
	published: string[];
	hashtags: string[];
	img_url: string;
	date: string;
}

export interface DataProps {
	_id: string;
	title: string;
	slugtitle: string;
	headlines: string[];
	slugheadlines: string[];
	summary: string[];
	sources: string[];
	published: string[];
	hashtags: string[];
	img_url: string;
	date: string;
}

export interface NewsItem {
	_id: string;
	headline: string;
	title: string;
	slugtitle: string;
	headlines: string;
	slugheadline: string;
	summary: string;
	date: string;
	img_url?: string;
	source?: string;
	sources: string[];
	published: string;
	hashtags: string[];
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}
