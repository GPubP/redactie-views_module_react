import { ViewCreate } from './services/view';

export const generateEmptyView = (): ViewCreate => ({
	label: '',
	description: '',
});
