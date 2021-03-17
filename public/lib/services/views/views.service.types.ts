import { ModuleRouteConfig, RouteConfigComponentProps } from '@redactie/redactie-core';
import { EmbeddedResponse, SearchParams } from '@redactie/utils';

import { Editor } from '../../views.types';
import { ContentTypeSchema } from '../contentTypes';

export interface ViewsSearchParams extends Omit<SearchParams, 'search'> {
	search?: string[];
}

export interface ViewsRouteProps extends RouteConfigComponentProps {
	basePath: string;
	routes: ModuleRouteConfig[];
	tenantId: string;
}

export type ViewsSchema = EmbeddedResponse<ViewSchema>;

export interface ViewQueryConditionField {
	fieldType?: string;
	dataType?: string;
	preset?: string | null;
	group: string;
	label: string;
	type: string;
	_id: string;
}

export interface ViewQueryOperator {
	label: string;
	value: any;
}

export interface ViewQueryCondition {
	field: ViewQueryConditionField;
	operator: ViewQueryOperator;
	value: string;
	uuid: string;
}

export interface ViewQueryOptionsOrderByValidation {
	required: boolean;
}

export interface ViewQueryOptionsOrderBy {
	dataType: string;
	group: string;
	indexed?: boolean;
	label: string;
	max?: number;
	min?: number;
	multiLanguage?: boolean;
	operators: ViewQueryOperator[];
	type?: string;
	uuid?: string;
	validation?: ViewQueryOptionsOrderByValidation;
	_id: string;
}

export interface ViewQueryOptions {
	limit: number;
	offset: number;
	order?: string;
	orderBy?: ViewQueryOptionsOrderBy;
}

export interface ViewQuery {
	conditions: ViewQueryCondition[];
	contentType?: ContentTypeSchema;
	options: ViewQueryOptions;
	page?: string;
	viewType: 'static' | 'dynamic';
}

export interface ViewMeta {
	label: string;
	safeLabel?: string;
	description: string;
	created?: string;
	lastModified?: string;
	lastEditor?: Editor;
	deleted?: boolean;
	site?: string;
}

export interface ViewSchema {
	query: ViewQuery;
	meta: ViewMeta;
	uuid?: string;
}
