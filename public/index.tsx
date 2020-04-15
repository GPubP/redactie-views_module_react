import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { TenantContext } from './lib/context';
import { ViewCreate, ViewDetailSettings } from './lib/views';
import { MODULE_PATHS } from './lib/views.const';
import { ViewsRouteProps } from './lib/views.types';

const ViewsComponent: FC<ViewsRouteProps> = ({ route, match, tenantId }) => {
	// if path is /views, redirect to /views/aanmaken
	if (/\/views$/.test(location.pathname)) {
		return <Redirect to={`${location.pathname}/aanmaken`} />;
	}

	// if path is /views/aanmaken, redirect to /views/aanmaken/instellingen
	if (/\/views\/aanmaken$/.test(location.pathname)) {
		return <Redirect to={`${location.pathname}/aanmaken/instellingen`} />;
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
		routes: [
			{
				path: MODULE_PATHS.create,
				component: ViewCreate,
				navigation: {
					context: 'site',
					label: 'Create view',
					parentPath: MODULE_PATHS.root,
				},
				routes: [
					{
						path: MODULE_PATHS.createSettings,
						component: ViewDetailSettings,
					},
				],
			},
		],
	});
}
