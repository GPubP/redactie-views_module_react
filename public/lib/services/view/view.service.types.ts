export interface ViewSchema {
	meta: ViewMetaSchema;
	uuid?: string;
}

export interface ViewMetaSchema {
	label: string;
	description: string;
}
