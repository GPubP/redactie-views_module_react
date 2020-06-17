import { api } from '../api';

import { ViewSchema } from './view.service.types';

export const getView = async (siteId: string, uuid: string): Promise<ViewSchema | null> => {
	try {
		const response: ViewSchema = await api.get(`${siteId}/views/${uuid}`).json();

		return response;
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const updateView = async (siteId: string, view: ViewSchema): Promise<ViewSchema | null> => {
	const response: ViewSchema = await api
		.put(`${siteId}/views/${view.uuid}`, {
			json: view,
		})
		.json();

	return response;
};

export const createView = async (siteId: string, view: ViewSchema): Promise<ViewSchema | null> => {
	const response: ViewSchema = await api
		.post(`${siteId}/views`, {
			json: view,
		})
		.json();

	return response;
};
