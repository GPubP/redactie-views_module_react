import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

import { ViewSchema } from './services/views';
import { InternalState } from './store/views';

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
	viewUuid?: string;
}

export interface ViewsDetailRouteProps<Params = {}> extends RouteConfigComponentProps<Params> {
	view: ViewSchema;
	onCancel: () => void;
	onSubmit: (data: ViewSchema, tab: Tab) => void;
	routes: ModuleRouteConfig[];
	state: InternalState;
	tenantId: string;
}

export interface SelectOptions {
	key: string;
	value: string;
	label: string;
}

export enum LoadingState {
	Loading = 'loading',
	Creating = 'creating',
	Updating = 'updating',
	Loaded = 'loaded',
	Error = 'error',
}

export interface Tab {
	name: string;
	target: string;
	active: boolean;
	disabled?: boolean;
}

export interface Editor {
	address: string | null;
	domain: string;
	email: string;
	externalMutableReference: string;
	firstname: string;
	id: string;
	lastname: string;
	nickname: string | null;
	type: string;
	username: string;
}
