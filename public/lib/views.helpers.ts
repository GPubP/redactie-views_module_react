import { ViewSchema } from './services/views';

export const generateEmptyView = (): ViewSchema => ({
	meta: {
		description: '',
		label: '',
		site: '',
	},
	query: {
		options: {
			offset: 0,
			limit: 0,
			order: 'asc',
		},
		viewType: 'dynamic',
		conditions: [],
	},
});
