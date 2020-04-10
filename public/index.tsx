import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import * as moment from 'moment';
import 'moment/locale/nl';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { ViewCreate, ViewDetailSettings } from './lib/views';
import { MODULE_PATHS } from './lib/views.const';
import { ViewsRouteProps } from './lib/views.types';

// eslint-disable-next-line import/namespace
moment.locale('nl');

const ViewsComponent: FC<ViewsRouteProps> = ({ route, match, tenantId }) => {
	// if path is /views, redirect to /views/aanmaken
	if (/\/views$/.test(location.pathname)) {
		return <Redirect to={`${location.pathname}/aanmaken`} />;
	}

	return (
		<>
			{Core.routes.render(route.routes as ModuleRouteConfig[], {
				basePath: match.url,
				tenantId,
			})}
		</>
	);
};

console.log('core', Core.routes.getAll());

const sitesAPI = Core.modules.getModuleAPI('sites-module');

if (sitesAPI) {
	sitesAPI.routes.register({
		path: '/:siteId/views',
		component: ViewsComponent,
		exact: true,
		navigation: {
			renderContext: 'site',
			context: 'site',
			label: 'Structuur',
		},
		routes: [
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
		],
	});
}
