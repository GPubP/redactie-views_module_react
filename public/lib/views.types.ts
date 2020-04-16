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

export interface ViewsMatchProps {
	siteId: string;
}

export enum LoadingState {
	Loading = 'loading',
	Loaded = 'loaded',
	Error = 'error',
}

export interface Tab {
	name: string;
	target: string;
	active: boolean;
	disabled?: boolean;
}
