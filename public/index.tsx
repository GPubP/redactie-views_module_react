import React, { FC, useMemo } from 'react';

import { RenderChildRoutes } from './lib/components';
import rolesRightsConnector from './lib/connectors/rolesRights';
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
import { MODULE_PATHS, urlSiteParam } from './lib/views.const';
import { ViewsRouteProps } from './lib/views.types';

const ViewsComponent: FC<ViewsRouteProps> = ({ route, match, tenantId }) => {
	const guardsMeta = useMemo(
		() => ({
			tenantId,
		}),
		[tenantId]
	);
	const extraOptions = useMemo(
		() => ({
			basePath: match.url,
			routes: route.routes,
			tenantId,
		}),
		[match.url, tenantId, route.routes]
	);
	return (
		<TenantContext.Provider value={{ tenantId }}>
			<RenderChildRoutes
				routes={route.routes}
				guardsMeta={guardsMeta}
				extraOptions={extraOptions}
			/>
		</TenantContext.Provider>
	);
};

if (rolesRightsConnector.api) {
	registerRoutes({
		path: MODULE_PATHS.root,
		component: ViewsComponent,
		redirect: MODULE_PATHS.overview,
		guardOptions: {
			guards: [
				rolesRightsConnector.api.guards.securityRightsSiteGuard(urlSiteParam, [
					rolesRightsConnector.securityRights.read,
				]),
			],
		},
		navigation: {
			renderContext: 'site',
			context: 'site',
			label: 'Views',
			canShown: [
				rolesRightsConnector.api.canShowns.securityRightsSiteCanShown(urlSiteParam, [
					rolesRightsConnector.securityRights.read,
				]),
			],
		},
		routes: [
			{
				path: MODULE_PATHS.overview,
				component: ViewsOverview,
			},
			{
				path: MODULE_PATHS.create,
				component: ViewCreate,
				redirect: MODULE_PATHS.createSettings,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsSiteGuard(urlSiteParam, [
							rolesRightsConnector.securityRights.create,
						]),
					],
				},
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
				redirect: MODULE_PATHS.detailSettings,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsSiteGuard(urlSiteParam, [
							rolesRightsConnector.securityRights.update,
						]),
					],
				},
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
} else {
	throw new Error(
		`Views Module can't resolve the following dependency: ${rolesRightsConnector.apiName}, please add the module to the dependency list.`
	);
}
