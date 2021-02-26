import { parseSearchParams, SearchParams } from '@redactie/utils';

import { proxyApi } from '../api';

import { DEFAULT_CONTENT_TYPES_SEARCH_PARAMS } from './contentTypes.service.const';
import { ContentTypeResponse, SparseContentTypesSchema } from './contentTypes.service.types';

export class ContentTypesApiService {
	public async getContentTypes(
		siteId: string,
		searchParams: SearchParams = DEFAULT_CONTENT_TYPES_SEARCH_PARAMS
	): Promise<SparseContentTypesSchema | null> {
		try {
			const response: SparseContentTypesSchema = await proxyApi
				.get(`${siteId}/content-types?${parseSearchParams(searchParams)}`)
				.json();

			if (!response) {
				throw new Error('Failed to get content-types');
			}

			return response;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async getContentType(siteId: string, uuid: string): Promise<ContentTypeResponse | null> {
		try {
			const response: ContentTypeResponse = await proxyApi
				.get(`${siteId}/content-types/${uuid}`)
				.json();

			return response;
		} catch (err) {
			console.error(err);
			return null;
		}
	}
}

export const contentTypesApiService = new ContentTypesApiService();
