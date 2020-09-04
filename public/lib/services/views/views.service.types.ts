import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';

import { ResponseMeta } from '../api';
import { ContentTypeSchema } from '../contentTypes';

export interface ViewsRouteProps extends RouteConfigComponentProps {
	basePath: string;
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export interface ViewsSchema {
	data: ViewSchema[];
	paging: ResponseMeta;
}

export interface ViewMetaSchema {
	label: string;
	safeLabel?: string;
	description: string;
	created?: string;
	lastModified?: string;
	deleted?: false;
	lastEditor?: string;
}

export interface ViewSchema {
	meta: ViewMetaSchema;
	query: {
		options?: ViewOptionsSchema;
		conditions: ViewConditionSchema[];
		contentType?: ContentTypeSchema;
	};
	uuid?: string;
	_id?: string;
}

export interface ViewOptionsSchema {
	offset: number;
	limit: number;
	orderBy?: any;
	order?: string;
}

export interface ViewConditionSchema {
	field: ConditionFieldSchema;
	value: string;
	uuid?: string;
	operator: OperatorSchema;
}

export interface OperatorSchema {
	label: string;
	value: string;
}

export interface ConditionFieldSchema {
	label: string;
	[key: string]: any;
}
