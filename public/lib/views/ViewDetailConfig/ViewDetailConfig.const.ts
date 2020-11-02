import { MODULE_PATHS, TENANT_ROOT } from '../../views.const';

export const VIEW_CC_NAV_LIST_ITEMS = [
	{ key: 'conditions', label: 'Voorwaarden', to: 'voorwaarden' },
	{ key: 'sort-options', label: 'Sorteer-opties', to: 'sorteer-opties' },
];

export const METHOD_OPTIONS = [
	{
		key: 'm1',
		label: 'Content ophalen op basis van parameters',
		value: 'dynamic',
	},
	{
		key: 'm2',
		label: 'Content manueel selecteren',
		value: 'static',
	},
];

export const CT_DEFAULT_DISABLED_OPTION = {
	key: 'none',
	value: '',
	label: 'Kies een content-type',
	disabled: true,
};

export const CONFIG_ALLOWED_LEAVE_PATHS = [
	`${TENANT_ROOT}${MODULE_PATHS.detailConfigStatic}`,
	`${TENANT_ROOT}${MODULE_PATHS.detailConfigDynamic}`,
	`${TENANT_ROOT}${MODULE_PATHS.detailDynamicConditions}`,
	`${TENANT_ROOT}${MODULE_PATHS.detailDynamicOptions}`,
];
