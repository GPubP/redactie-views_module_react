import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import { useEffect, useState } from 'react';

const useRoutes = (): ModuleRouteConfig[] | null => {
	const [routes, setRoutes] = useState<ModuleRouteConfig[] | null>(null);

	useEffect(() => {
		const observable = Core.routes.routesChanges.subscribe(routes => {
			if (routes) {
				setRoutes(routes);
			}
		});

		return () => {
			observable.unsubscribe();
		};
	}, [routes]);

	return routes;
};

export default useRoutes;
