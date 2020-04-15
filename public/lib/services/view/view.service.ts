import { api } from '../api';

import { ViewSchema } from './view.service.types';

export const getView = async (uuid: string): Promise<ViewSchema | null> => {
	try {
		const response: ViewSchema = await api.get(`views/${uuid}`).json();

		return response;
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const createView = async (view: ViewSchema): Promise<ViewSchema | null> => {
	const response: ViewSchema = await api
		.post('views', {
			json: view,
		})
		.json();

	return response;
};
