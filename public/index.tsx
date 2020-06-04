import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import rolesRightsConnector from './lib/connectors/rolesRights';
import { registerRoutes } from './lib/connectors/sites';
import { TenantContext } from './lib/context';
import { renderRoutes } from './lib/helpers';
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
			{renderRoutes(
				route.routes,
				{
					tenantId,
				},
				{
					basePath: match.url,
					routes: route.routes,
					tenantId,
				}
			)}
		</TenantContext.Provider>
	);
};

if (rolesRightsConnector.api) {
	registerRoutes({
		path: MODULE_PATHS.root,
		component: ViewsComponent,
		exact: true,
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
