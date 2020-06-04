import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { ReactElement } from 'react';

const renderRoutes = (
	routes: ModuleRouteConfig[] | undefined,
	guardMeta: Record<string, unknown>,
	extraOptions: Record<string, unknown>
): ReactElement => {
	return (
		<>
			{Core.routes.render(
				routes?.map(route => ({
					...route,
					guardOptions: {
						...route.guardOptions,
						meta: guardMeta,
					},
				})),
				extraOptions
			)}
		</>
	);
};

export default renderRoutes;
