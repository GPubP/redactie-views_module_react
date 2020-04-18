import { Tab } from './views.types';

export const BREADCRUMB_OPTIONS = {
	excludePaths: ['/', '/:tenantId', '/:tenantId/sites/:siteId/views/aanmaken/instellingen'],
};

export const VIEW_DETAIL_TAB_MAP: { [key: string]: Tab } = {
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
	createConfig: '/:siteId/views/aanmaken/configuratie',
};