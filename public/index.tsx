import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { TenantContext } from './lib/context';
import {
	ViewCreate,
	ViewDetailConditions,
	ViewDetailConfig,
	ViewDetailSettings,
	ViewsOverview,
} from './lib/views';
import { MODULE_PATHS } from './lib/views.const';
import { ViewsRouteProps } from './lib/views.types';
import ViewDetailOptions from './lib/views/ViewDetailConditions/ViewDetailConditions';

const ViewsComponent: FC<ViewsRouteProps> = ({ route, match, tenantId }) => {
	// if path is /views, redirect to /views/beheer
	if (/\/views$/.test(location.pathname)) {
		return <Redirect to={`${match.url}/beheer`} />;
	}

	// if path is /views/aanmaken, redirect to /views/aanmaken/instellingen
	if (/\/views\/aanmaken$/.test(location.pathname)) {
		return <Redirect to={`${match.url}/aanmaken/instellingen`} />;
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

const sitesAPI = Core.modules.getModuleAPI('sites-module');

if (sitesAPI) {
	sitesAPI.routes.register({
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
					{
						path: MODULE_PATHS.createConfig,
						component: ViewDetailConfig,
						routes: [
							{
								path: MODULE_PATHS.createConditions,
								component: ViewDetailConditions,
							},
							{
								path: MODULE_PATHS.createOptions,
								component: ViewDetailOptions,
							},
						],
					},
				],
			},
		],
	});
}
