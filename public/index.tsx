import React, { FC, useMemo } from 'react';

import { RenderChildRoutes } from './lib/components';
import { registerCCFields } from './lib/components/Fields';
import rolesRightsConnector from './lib/connectors/rolesRights';
import { registerRoutes } from './lib/connectors/sites';
import { TenantContext } from './lib/context';
import {
	ViewCreate,
	ViewDetailConditions,
	ViewDetailConfig,
	ViewDetailConfigDynamic,
	ViewDetailConfigStatic,
	ViewDetailOptions,
	ViewDetailSettings,
	ViewsOverview,
	ViewUpdate,
} from './lib/views';
import { MODULE_PATHS, urlSiteParam } from './lib/views.const';
import { ViewsRouteProps } from './lib/views.types';

const ViewsComponent: FC<ViewsRouteProps<{ siteId: string }>> = ({ route, match, tenantId }) => {
	const { siteId } = match.params;
	const guardsMeta = useMemo(
		() => ({
			tenantId,
			siteId,
		}),
		[siteId, tenantId]
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
		<TenantContext.Provider value={{ tenantId, siteId }}>
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
						redirect: MODULE_PATHS.detailConfigDynamic,
						routes: [
							{
								path: MODULE_PATHS.detailConfigDynamic,
								component: ViewDetailConfigDynamic,
								redirect: MODULE_PATHS.detailDynamicConditions,
								routes: [
									{
										path: MODULE_PATHS.detailDynamicConditions,
										component: ViewDetailConditions,
									},
									{
										path: MODULE_PATHS.detailDynamicOptions,
										component: ViewDetailOptions,
									},
								],
							},
							{
								path: MODULE_PATHS.detailConfigStatic,
								component: ViewDetailConfigStatic,
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

registerCCFields();
