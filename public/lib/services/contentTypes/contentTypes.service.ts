import api, { parseSearchParams } from '../api/api.service';
import { SearchParams } from '../api/api.service.types';

import { DEFAULT_CONTENT_TYPES_SEARCH_PARAMS } from './contentTypes.service.const';
import { ContentTypeResponse, ContentTypesSchema } from './contentTypes.service.types';

export const getContentTypes = async (
	searchParams: SearchParams = DEFAULT_CONTENT_TYPES_SEARCH_PARAMS
): Promise<ContentTypeResponse[] | null> => {
	try {
		const response: ContentTypesSchema = await api
			.get(`content-types?${parseSearchParams(searchParams)}`)
			.json();

		if (!response.data) {
			throw new Error('Failed to get content-types');
		}

		return response.data;
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const getContentType = async (uuid: string): Promise<ContentTypeResponse | null> => {
	try {
		const response: ContentTypeResponse = await api.get(`content-types/${uuid}`).json();

		return response;
	} catch (err) {
		console.error(err);
		return null;
	}
};
