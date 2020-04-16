import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

export interface ViewsRouteProps extends RouteConfigComponentProps {
	basePath: string;
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface ViewMetaSchema {
	label: string;
	safeLabel: string;
	description: string;
	created: string;
	lastModified: string;
	deleted: false;
	lastEditor: string;
}

export interface ViewSchema {
	_id: string;
	uuid: string;
	meta: ViewMetaSchema;
}

export interface ViewsSchema {
	data: ViewSchema[];
}
