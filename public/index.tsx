import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { registerRoutes } from './lib/connectors/sites';
import { TenantContext } from './lib/context';
import {
	ViewCreate,
	ViewDetailConditions,
	ViewDetailConfig,
	ViewDetailOptions,
	ViewDetailSettings,
	ViewsOverview,
	ViewUpdate,
} from './lib/views';
import { MODULE_PATHS } from './lib/views.const';
import { ViewsRouteProps } from './lib/views.types';

const ViewsComponent: FC<ViewsRouteProps> = ({ route, match, tenantId }) => {
	const uuidRegex = '\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b';

	// Redirect /views to /views/aanmaken
	if (/\/views$/.test(location.pathname)) {
		return <Redirect to={`${match.url}/beheer`} />;
	}

	// Redirect /views/aanmaken to /views/aanmaken/instellingen
	if (/\/views\/aanmaken$/.test(location.pathname)) {
		return <Redirect to={`${match.url}/aanmaken/instellingen`} />;
	}

	// Redirect /views/:viewUuid to /views/:viewUuid/instellingen
	if (new RegExp(`/views/${uuidRegex}$`).test(location.pathname)) {
		return <Redirect to={`${match.url}/instellingen`} />;
	}

	return (
		<TenantContext.Provider value={{ tenantId }}>
			{Core.routes.render(route.routes as ModuleRouteConfig[], {
				basePath: match.url,
				routes: route.routes,
				tenantId,
			})}
		</TenantContext.Provider>
	);
};

registerRoutes({
	path: MODULE_PATHS.root,
	component: ViewsComponent,
	breadcrumb: 'Views',
	exact: true,
	navigation: {
		renderContext: 'site',
		context: 'site',
		label: 'Views',
	},
	routes: [
		{
			path: MODULE_PATHS.overview,
			component: ViewsOverview,
		},
		{
			path: MODULE_PATHS.create,
			component: ViewCreate,
			routes: [
				{
					path: MODULE_PATHS.createSettings,
					component: ViewDetailSettings,
				},
			],
		},
		{
			path: MODULE_PATHS.detail,
			component: ViewUpdate,
			routes: [
				{
					path: MODULE_PATHS.detailSettings,
					component: ViewDetailSettings,
				},
				{
					path: MODULE_PATHS.detailConfig,
					component: ViewDetailConfig,
					routes: [
						{
							path: MODULE_PATHS.detailConditions,
							component: ViewDetailConditions,
						},
						{
							path: MODULE_PATHS.detailOptions,
							component: ViewDetailOptions,
						},
					],
				},
			],
		},
	],
});
