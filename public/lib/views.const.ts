import { Tab } from './views.types';

export const BREADCRUMB_OPTIONS = {
	excludePaths: [
		'/',
		'/:tenantId',
		'/:tenantId/sites/:siteId/views/aanmaken/instellingen',
		'/:tenantId/sites/:siteId/views/:viewUuid/instellingen',
		'/:tenantId/sites/:siteId/views/:viewUuid/configuratie',
		'/:tenantId/sites/:siteId/views/:viewUuid/configuratie/voorwaarden',
		'/:tenantId/sites/:siteId/views/:viewUuid/configuratie/sorteer-opties',
	],
};

export const VIEW_DETAIL_TAB_MAP: { [key in 'settings' | 'config']: Tab } = {
	settings: {
		name: 'Instellingen',
		target: 'instellingen',
		active: true,
	},
	config: {
		name: 'Configuratie',
		target: 'configuratie',
		active: false,
	},
};

export const VIEW_DETAIL_TABS: Tab[] = [VIEW_DETAIL_TAB_MAP.settings, VIEW_DETAIL_TAB_MAP.config];

export const MODULE_PATHS = {
	root: '/:siteId/views',
	overview: '/:siteId/views/beheer',
	create: '/:siteId/views/aanmaken',
	createSettings: '/:siteId/views/aanmaken/instellingen',
	detail: '/:siteId/views/:viewUuid',
	detailSettings: '/:siteId/views/:viewUuid/instellingen',
	detailConfig: '/:siteId/views/:viewUuid/configuratie',
	detailConditions: '/:siteId/views/:viewUuid/configuratie/voorwaarden',
	detailOptions: '/:siteId/views/:viewUuid/configuratie/sorteer-opties',
};
