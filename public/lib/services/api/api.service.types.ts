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
