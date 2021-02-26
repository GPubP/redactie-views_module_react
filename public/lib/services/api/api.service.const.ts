import { OrderBy, SearchParams } from '@redactie/utils';

export const DEFAULT_SEARCH_PARAMS: SearchParams & { limit: number } = {
	page: 1,
	limit: 10,
	skip: 0,
	sparse: true,
};

export const DEFAULT_SORTING: OrderBy = {
	key: 'name',
	order: 'asc',
};
