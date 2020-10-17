export interface FormUpdateConditionalValue {
	field: string;
	value: string;
	uuid?: string;
	index: number;
}

export interface FormEditStaticConditionProps {
	formData: FormUpdateConditionalValue;
	onSubmit: (data: FormUpdateConditionalValue) => void;
	submitLabel?: string;
	submitType?: 'success' | 'primary';
	onDelete?: (conditionIndex: number) => void;
	onCancel: () => void;
}
