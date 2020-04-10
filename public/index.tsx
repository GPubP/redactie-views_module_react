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

// temp register routes on core
// TODO: register on sites
Core.routes.register({
	path: MODULE_PATHS.root,
	component: ViewsComponent,
	breadcrumb: 'Views',
	exact: true,
	navigation: {
		label: 'Views',
	},
	routes: [
		{
			path: MODULE_PATHS.create,
			component: ViewCreate,
			navigation: {
				label: 'Create view',
				parentPath: MODULE_PATHS.root,
			},
		},
	],
});
