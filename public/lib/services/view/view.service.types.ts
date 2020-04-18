export interface ViewSchema {
	meta: ViewMetaSchema;
	query: {
		options?: ViewOptionsSchema;
		conditions: ViewConditionSchema[] | [];
	};
	contentType?: any;
	uuid?: string;
}

export interface ViewMetaSchema {
	label: string;
	description: string;
}

export interface ViewOptionsSchema {
	offset: number;
	limit: number;
	orderBy: any;
	order: string;
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
}
