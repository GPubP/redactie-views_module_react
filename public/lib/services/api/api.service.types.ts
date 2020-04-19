export interface OrderBy {
	key: string;
	order: 'asc' | 'desc';
}

export interface SearchParams {
	limit: number;
	page?: number;
	skip: number;
	direction?: number;
	search?: string[];
	sort?: string;
}

export interface ResponseMeta {
	limit: number;
	skip: number;
	total: number;
	moreResults: boolean;
}
