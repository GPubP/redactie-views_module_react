import { FieldCompartment } from '@redactie/form-renderer-module';

export interface BaseContentTypeField {
	uuid?: string;
	label: string;
	module: string;
	name: string;
	config: any;
	validators: string[];
	operators: Operator[];
	defaultValue: any;
	generalConfig: {
		multiLanguage?: boolean;
		required?: boolean;
		hidden?: boolean;
		disabled: boolean;
		min?: number;
		max?: number;
		guideline: string;
	};
	compartment: FieldCompartment;
}

export interface ContentTypeFieldSchema extends BaseContentTypeField {
	dataType: string;
	fieldType: string;
}

export interface ContentTypeFieldResponse extends BaseContentTypeField {
	dataType: {
		_id: string;
		meta: {
			createdAt: string;
			deleted: boolean;
			lastModified: string;
		};
		data: {
			label: string;
			type: string;
			semanticType: string;
		};
		uuid: string;
	};
	fieldType: FieldTypeSchema;
	preset: Preset;
}

export interface ContentTypeMetaSchema {
	label: string;
	safeLabel: string;
	description: string;
	created: string;
	lastModified: string;
	taxonomy: {
		available: string[];
		fieldType: string;
		tags: string[];
	};
	deleted: false;
	status?: string;
	lastEditor: string;
}

export interface ContentTypeSchema {
	_id: string;
	uuid: string;
	fields: ContentTypeFieldResponse[];
	meta: ContentTypeMetaSchema;
}
export interface ContentTypesDataSchema {
	data: ContentTypeSchema[];
}

export interface ContentTypeResponse {
	_id: string;
	uuid: string;
	fields: ContentTypeFieldResponse[];
	meta: ContentTypeMetaSchema;
}

export interface SparseContentTypeResponse extends ContentTypeResponse {
	fields: never;
}

export interface ContentTypePaging {
	total: number;
	moreResults: boolean;
	limit: number;
	skip: number;
}

export interface ContentTypesSchema {
	data: ContentTypeResponse[];
	paging: ContentTypePaging;
}

export interface SparseContentTypesSchema extends ContentTypesSchema {
	data: SparseContentTypeResponse[];
}

export interface ContentTypeCreate {
	fields: ContentTypeFieldSchema[];
	meta: {
		label: string;
		description: string;
		safeLabel: string;
		// TODO: fix in backend that this isn't needed
		deleted: boolean;
	};
}

export interface Operator {
	label: string;
	value: string;
	key: string;
}

export interface FieldTypeSchemaData {
	label: string;
	name: string;
	componentName: string;
	validators: any[];
	defaultValidatorValues: any[];
	defaultConfig: any;
	formSchema: {
		fields: any[];
	};
	dataType: string;
	generalConfig: {
		isQueryable: boolean;
		isTranslate: boolean;
		isMultiple: boolean;
		defaultGuideline?: string;
		defaultLabel?: string;
	};
	operators: Operator[];
	module: string;
}

export interface FieldTypeSchemaMeta {
	created: string;
	lastModified: string;
	lastEditor: string;
	deleted: boolean;
}

export interface FieldTypeSchema {
	_id?: string;
	uuid: string;
	data: FieldTypeSchemaData;
	meta: FieldTypeSchemaMeta;
}

export type FieldTypesSchema = {
	data: FieldTypeSchema[];
};

export interface BasePreset<T, F> {
	_id: string;
	uuid: string;
	data: {
		name: string;
		label: string;
		defaultConfig: Record<string, any>;
		fieldType: F;
		generalConfig: {
			isQueryable: boolean;
			isTranslate: boolean;
			isMultiple: boolean;
		};
		fields: {
			field: any;
			formSchema: {
				fields: ContentTypeFieldSchema[];
			};
			validators: T[];
		}[];
		validators: T[];
		meta: {
			created: string;
			lastModified: string;
			deleted: boolean;
		};
	};
}

export type Preset = BasePreset<string, string>;
