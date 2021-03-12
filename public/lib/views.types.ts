import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { ContextHeaderTab } from '@redactie/utils';

import { ContentTypeSchema } from './services/contentTypes';
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
	onSubmit: (data: ViewSchema | Partial<ViewSchema>, tab: ContextHeaderTab) => void;
	loading: boolean;
	rights: ViewRights;
	routes: ModuleRouteConfig[];
	state: InternalState;
	tenantId: string;
}

export interface ViewsDetailConfigRouteProps {
	view: ViewSchema;
	contentType: ContentTypeSchema;
	rights: ViewRights;
	onSubmit: (data: ViewSchema | Partial<ViewSchema>) => void;
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

export interface ViewRights {
	canUpdate: boolean;
}
