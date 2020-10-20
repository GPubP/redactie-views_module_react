import { object, string } from 'yup';

import { MODULE_PATHS, TENANT_ROOT } from '../../views.const';

export const VIEW_SETTINGS_VALIDATION_SCHEMA = object().shape({
	meta: object().shape({
		label: string().required('Label is een verplicht veld'),
		description: string().required('Beschrijving is een verplicht veld'),
	}),
});

export const SETTNGS_ALLOWED_LEAVE_PATHS = [
	`${TENANT_ROOT}${MODULE_PATHS.detailConfigDynamic}`,
	`${TENANT_ROOT}${MODULE_PATHS.detailDynamicConditions}`,
];
