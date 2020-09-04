import { getFieldRegistery } from '../../connectors/formRenderer';

import { ViewSelect } from './ViewSelect';

export const registerCCFields = (): void => {
	const fieldRegistery = getFieldRegistery();

	if (fieldRegistery) {
		fieldRegistery.add([
			{
				name: 'viewReference',
				module: 'views',
				component: ViewSelect,
			},
		]);
	}
};
