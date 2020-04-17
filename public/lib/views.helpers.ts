import { ViewSchema } from './services/view';
import { FilterFormState } from './views.types';

export const generateFilterFormState = (): FilterFormState => ({
	name: '',
});

export const generateEmptyView = (): ViewSchema => ({
	meta: {
		description: '',
		label: '',
	},
	query: {
		options: {
			offset: 0,
			limit: 0,
			orderBy: 'name',
			order: 'asc',
		},
		conditions: [],
	},
});
