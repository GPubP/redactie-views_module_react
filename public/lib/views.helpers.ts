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
});
