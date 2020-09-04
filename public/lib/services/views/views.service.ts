import { api, DEFAULT_SEARCH_PARAMS, parseSearchParams, SearchParams } from '../api';

import { ViewSchema, ViewsSchema } from './views.service.types';

export class ViewsApiService {
	public async getViews(
		siteId: string,
		searchParams: SearchParams = DEFAULT_SEARCH_PARAMS
	): Promise<ViewsSchema | null> {
		try {
			console.log('siteId', siteId);
			const response: ViewsSchema = await api
				.get(`${siteId}/views?${parseSearchParams(searchParams)}`)
				.json();

			if (!response.data) {
				throw new Error('Failed to get views');
			}

			return response;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async getView(siteId: string, uuid: string): Promise<ViewSchema | null> {
		try {
			const response: ViewSchema = await api.get(`${siteId}/views/${uuid}`).json();

			return response;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async updateView(siteId: string, view: ViewSchema): Promise<ViewSchema | null> {
		const response: ViewSchema = await api
			.put(`${siteId}/views/${view.uuid}`, {
				json: view,
			})
			.json();

		return response;
	}

	public async createView(siteId: string, view: ViewSchema): Promise<ViewSchema | null> {
		const response: ViewSchema = await api
			.post(`${siteId}/views`, {
				json: view,
			})
			.json();

		return response;
	}
}

export const viewsApiService = new ViewsApiService();
