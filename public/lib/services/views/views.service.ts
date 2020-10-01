import { api, DEFAULT_SEARCH_PARAMS, parseSearchParams, SearchParams } from '../api';

import { ViewSchema, ViewsSchema } from './views.service.types';

export class ViewsApiService {
	public async getViews(
		siteId: string,
		searchParams: SearchParams = DEFAULT_SEARCH_PARAMS
	): Promise<ViewsSchema | null> {
		try {
			const response: ViewsSchema = await api
				.get(`sites/${siteId}/views?${parseSearchParams(searchParams)}`)
				.json();

			if (!response._embedded) {
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
			const response: ViewSchema = await api.get(`sites/${siteId}/views/${uuid}`).json();

			return response;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async updateView(siteId: string, view: ViewSchema): Promise<ViewSchema | null> {
		const response: ViewSchema = await api
			.put(`sites/${siteId}/views/${view.uuid}`, {
				json: view,
			})
			.json();

		return response;
	}

	public async createView(siteId: string, view: ViewSchema): Promise<ViewSchema | null> {
		const response: ViewSchema = await api
			.post(`sites/${siteId}/views`, {
				json: view,
			})
			.json();

		return response;
	}
}

export const viewsApiService = new ViewsApiService();
