import ky from 'ky';
import { stringify } from 'query-string';

import { OrderBy, SearchParams } from './api.service.types';

export type KyInstance = typeof ky;

// Create ky instance with defaults
const api: KyInstance = ky.create({
	prefixUrl: '/v1/proxy/',
});

export const parseOrderBy = (orderBy: OrderBy): { sort: string; direction: number } => {
	return {
		sort: orderBy.key,
		direction: orderBy.order === 'asc' ? 1 : -1,
	};
};

export const parseSearchParams = (searchParams: SearchParams): string => {
	return stringify(searchParams, { arrayFormat: 'comma' });
};

export default api;
