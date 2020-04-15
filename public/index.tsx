import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { ViewsOverview } from './lib/views';
import { ViewsRouteProps } from './lib/views.types';

const ViewsComponent: FC<ViewsRouteProps> = ({ route, match, tenantId }) => {
	// if path is /views, redirect to /views/beheer
	if (/\/views$/.test(location.pathname)) {
		return <Redirect to={`/${tenantId}/views/beheer`} />;
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

// temp register routes on core due to conflicting dependencies
// TODO: register on sites
Core.routes.register({
	path: '/views',
	component: ViewsComponent,
	exact: true,
	navigation: {
		label: 'Views',
	},
	routes: [
		{
			path: '/views/beheer',
			component: ViewsOverview,
		},
	],
});
