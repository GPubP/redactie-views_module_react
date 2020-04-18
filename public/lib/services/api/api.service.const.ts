import { OrderBy, SearchParams } from './api.service.types';

export const DEFAULT_SEARCH_PARAMS: SearchParams = {
	page: 1,
	limit: 10,
	skip: 0,
};

export const DEFAULT_SORTING: OrderBy = {
	key: 'name',
	order: 'asc',
};
