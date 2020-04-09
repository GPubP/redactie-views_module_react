import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

export interface ViewsRouteProps<
	Params extends {
		[K in keyof Params]?: string;
	} = {}
> extends RouteConfigComponentProps<Params> {
	basePath: string;
	routes: ModuleRouteConfig[];
	tenantId: string;
}
