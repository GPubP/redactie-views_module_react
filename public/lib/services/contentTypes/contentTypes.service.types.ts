export interface BaseContentTypeField {
	uuid?: string;
	label: string;
	module: string;
	name: string;
	config: any;
	validators: string[];
	operators: Operator[];
	generalConfig: {
		multiLanguage?: boolean;
		required?: boolean;
		hidden?: boolean;
		min?: number;
		max?: number;
	};
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
	fields: ContentTypeFieldSchema[];
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

export interface ContentTypesSchema {
	data: ContentTypeResponse[];
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
