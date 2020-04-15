import { api, parseSearchParams, SearchParams } from '../api';

import { DEFAULT_VIEWS_SEARCH_PARAMS } from './views.service.const';
import { ViewsSchema } from './views.service.types';

export const getViews = async (
	searchParams: SearchParams = DEFAULT_VIEWS_SEARCH_PARAMS
): Promise<ViewsSchema | null> => {
	try {
		const response: ViewsSchema = await api
			.get(`content/views?${parseSearchParams(searchParams)}`)
			.json();

		if (!response.data) {
			throw new Error('Failed to get views');
		}

		return {
			data: response.data,
		};
	} catch (err) {
		console.error(err);
		return null;
	}
};
