import { api } from '../api';

import { ViewSchema, ViewsSchema } from './views.service.types';

export const getViews = async (): Promise<ViewSchema[] | null> => {
	try {
		const response: ViewsSchema = await api.get('views').json();

		return response.data;
	} catch (err) {
		console.error(err);
		return null;
	}
};
