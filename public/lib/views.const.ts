import { ContextHeaderTab } from '@redactie/utils';

export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', '/:tenantId', '/:tenantId/sites', '/:tenantId/sites/:siteId'],
};

export const VIEW_DETAIL_TAB_MAP: { [key in 'settings' | 'config']: ContextHeaderTab } = {
	settings: {
		name: 'Instellingen',
		target: 'instellingen',
		active: true,
		disabled: false,
	},
	config: {
		name: 'Configuratie',
		target: 'configuratie',
		active: false,
		disabled: false,
	},
};

export const SITES_ROOT = 'sites';
export const VIEW_DETAIL_TABS: ContextHeaderTab[] = [
	VIEW_DETAIL_TAB_MAP.settings,
	VIEW_DETAIL_TAB_MAP.config,
];
export const urlSiteParam = 'siteId';
export const TENANT_ROOT = '/:tenantId/sites';
export const MODULE_PATHS = {
	dashboard: `/:${urlSiteParam}/content`,
	root: `/:${urlSiteParam}/views`,
	overview: `/:${urlSiteParam}/views/overzicht`,
	create: `/:${urlSiteParam}/views/aanmaken`,
	createSettings: `/:${urlSiteParam}/views/aanmaken/instellingen`,
	detail: `/:${urlSiteParam}/views/:viewUuid`,
	detailSettings: `/:${urlSiteParam}/views/:viewUuid/instellingen`,
	detailConfig: `/:${urlSiteParam}/views/:viewUuid/configuratie`,
	detailConfigStatic: `/:${urlSiteParam}/views/:viewUuid/configuratie/statisch`,
	detailConfigDynamic: `/:${urlSiteParam}/views/:viewUuid/configuratie/dynamisch`,
	detailDynamicConditions: `/:${urlSiteParam}/views/:viewUuid/configuratie/dynamisch/voorwaarden`,
	detailDynamicOptions: `/:${urlSiteParam}/views/:viewUuid/configuratie/dynamisch/sorteer-opties`,
};

export const ALERT_CONTAINER_IDS = {
	settings: 'settings',
	config: 'config',
};
