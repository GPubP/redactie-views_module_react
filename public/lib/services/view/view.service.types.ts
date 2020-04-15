export interface ViewSchema {
	meta: ViewMetaSchema;
	query: {
		options?: ViewOptionsSchema;
		conditions: ViewConditionSchema[] | [];
	};
	uuid?: string;
}

export interface ViewMetaSchema {
	label: string;
	description: string;
}

export interface ViewOptionsSchema {
	offset: 0;
	limit: 0;
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
}
