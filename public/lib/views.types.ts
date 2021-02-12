import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { ContextHeaderTab } from '@redactie/utils';

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
	onSubmit: (data: ViewSchema, tab: ContextHeaderTab) => void;
	routes: ModuleRouteConfig[];
	state: InternalState;
	tenantId: string;
}

export interface SelectOptions {
	key: string;
	value: string;
	label: string;
	disabled?: boolean;
}

export enum LoadingState {
	Loading = 'loading',
	Creating = 'creating',
	Updating = 'updating',
	Loaded = 'loaded',
	Error = 'error',
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
