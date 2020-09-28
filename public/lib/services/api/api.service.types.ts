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
	contentTypes?: string;
}

export interface ResponseMeta {
	limit: number;
	skip: number;
	total: number;
	moreResults: boolean;
}

export interface ResponsePaging {
	size: number;
	totalElements: number;
	totalPages: number;
	number: number;
}
