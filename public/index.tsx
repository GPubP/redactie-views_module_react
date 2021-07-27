import { RenderChildRoutes, SiteContext, TenantContext } from '@redactie/utils';
import React, { FC, useMemo } from 'react';

import { registerCCFields } from './lib/components/Fields';
import rolesRightsConnector from './lib/connectors/rolesRights';
import { registerRoutes } from './lib/connectors/sites';
import {
	ViewCreate,
	ViewDetailConditions,
	ViewDetailConfig,
	ViewDetailConfigDynamic,
	ViewDetailConfigStatic,
	ViewDetailOptions,
	ViewDetailPreview,
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
		<TenantContext.Provider value={{ tenantId }}>
			<SiteContext.Provider value={{ siteId }}>
				<RenderChildRoutes
					routes={route.routes}
					guardsMeta={guardsMeta}
					extraOptions={extraOptions}
				/>
			</SiteContext.Provider>
		</TenantContext.Provider>
	);
};

if (rolesRightsConnector.api) {
	registerRoutes({
		path: MODULE_PATHS.root,
		component: ViewsComponent,
		breadcrumb: false,
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
			order: 2,
			canShown: [
				rolesRightsConnector.api.canShowns.securityRightsSiteCanShown(urlSiteParam, [
					rolesRightsConnector.securityRights.read,
				]),
			],
		},
		routes: [
			{
				path: MODULE_PATHS.overview,
				breadcrumb: false,
				component: ViewsOverview,
			},
			{
				path: MODULE_PATHS.create,
				breadcrumb: false,
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
						breadcrumb: false,
						component: ViewDetailSettings,
					},
				],
			},
			{
				path: MODULE_PATHS.detail,
				breadcrumb: false,
				component: ViewUpdate,
				redirect: MODULE_PATHS.detailSettings,
				guardOptions: {
					guards: [
						rolesRightsConnector.api.guards.securityRightsSiteGuard(urlSiteParam, [
							rolesRightsConnector.securityRights.read,
						]),
					],
				},
				routes: [
					{
						path: MODULE_PATHS.detailSettings,
						breadcrumb: false,
						component: ViewDetailSettings,
					},
					{
						path: MODULE_PATHS.detailConfig,
						breadcrumb: false,
						component: ViewDetailConfig,
						redirect: MODULE_PATHS.detailConfigDynamic,
						routes: [
							{
								path: MODULE_PATHS.detailConfigDynamic,
								breadcrumb: false,
								component: ViewDetailConfigDynamic,
								redirect: MODULE_PATHS.detailDynamicConditions,
								routes: [
									{
										path: MODULE_PATHS.detailDynamicConditions,
										breadcrumb: false,
										component: ViewDetailConditions,
									},
									{
										path: MODULE_PATHS.detailDynamicOptions,
										breadcrumb: false,
										component: ViewDetailOptions,
									},
								],
							},
							{
								path: MODULE_PATHS.detailConfigStatic,
								breadcrumb: false,
								component: ViewDetailConfigStatic,
							},
						],
					},
					{
						path: MODULE_PATHS.detailPreview,
						breadcrumb: false,
						component: ViewDetailPreview,
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
