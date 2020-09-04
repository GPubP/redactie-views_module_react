import { ViewSchema } from './services/views';

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
