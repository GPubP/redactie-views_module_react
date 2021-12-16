import formRendererConnector from '../../connectors/formRenderer';

import { ViewSelect, ViewSelectView } from './ViewSelect';

export const registerCCFields = (): void => {
	const fieldRegistery = formRendererConnector.api.fieldRegistry;

	if (fieldRegistery) {
		fieldRegistery.add([
			{
				name: 'viewReference',
				module: 'views',
				component: ViewSelect,
				viewComponent: ViewSelectView,
			},
		]);
	}
};
