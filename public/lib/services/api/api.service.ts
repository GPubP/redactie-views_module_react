import Core from '@redactie/redactie-core';
import ky from 'ky';
import { stringify } from 'query-string';

import { OrderBy, SearchParams } from './api.service.types';

export type KyInstance = typeof ky;

const CoreConfig = Core.config.getValue('core') || {};

// Create ky instance with defaults
export const proxyApi: KyInstance = ky.create({
	prefixUrl: '/v1/proxy/admin/content/v1/proxy/sites',
	headers: {
		'x-tenant-id': CoreConfig.tenantId,
	},
});

export const api: KyInstance = ky.create({
	prefixUrl: '/v1/proxy/admin/content/v1',
	headers: {
		'x-tenant-id': CoreConfig.tenantId,
	},
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
