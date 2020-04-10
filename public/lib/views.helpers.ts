import { ViewSchema } from './services/view';

export const generateEmptyView = (): ViewSchema => ({
	meta: {
		description: '',
		label: '',
	},
});
