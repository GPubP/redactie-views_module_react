import { api, DEFAULT_SEARCH_PARAMS, parseSearchParams, SearchParams } from '../api';

import { ViewsSchema } from './views.service.types';

export const getViews = async (
	searchParams: SearchParams = DEFAULT_SEARCH_PARAMS
): Promise<ViewsSchema | null> => {
	try {
		const response: ViewsSchema = await api
			.get(`views?${parseSearchParams(searchParams)}`)
			.json();

		if (!response.data) {
			throw new Error('Failed to get views');
		}

		return response;
	} catch (err) {
		console.error(err);
		return null;
	}
};
