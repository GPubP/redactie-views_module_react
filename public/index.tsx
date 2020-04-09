import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';

import { ViewsRouteProps } from './lib/views.types';

const ViewsComponent: FC<ViewsRouteProps> = ({ route, match, tenantId }) => {
	return (
		<>
			{Core.routes.render(route.routes as ModuleRouteConfig[], {
				basePath: match.url,
				tenantId,
			})}
		</>
	);
};

const sitesAPI = Core.modules.getModuleAPI('sites-module');

if (sitesAPI) {
	sitesAPI.routes.register({
		path: '/:siteId/views',
		component: ViewsComponent,
		breadcrumb: 'Views',
		exact: true,
		navigation: {
			renderContext: 'site',
			context: 'site',
			label: 'Views',
		},
		routes: [],
	});
}
