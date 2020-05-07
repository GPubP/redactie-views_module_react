import { Breadcrumb, ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigate } from '../../hooks';
import { BREADCRUMB_OPTIONS, MODULE_PATHS } from '../../views.const';
import useRoutes from '../useRoutes/useRoutes';

const useRoutesBreadcrumbs = (
	extraBreadcrumbs: Breadcrumb[] = [],
	extraProps?: Record<string, unknown>
): ReactNode => {
	const { generatePath } = useNavigate();
	const { siteId } = useParams();
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], {
		...BREADCRUMB_OPTIONS,
		extraProps,
		extraBreadcrumbs: [
			{
				name: 'Home',
				target: generatePath(MODULE_PATHS.dashboard, {
					siteId,
				}),
			},
			...extraBreadcrumbs,
		],
	});

	return breadcrumbs;
};

export default useRoutesBreadcrumbs;
