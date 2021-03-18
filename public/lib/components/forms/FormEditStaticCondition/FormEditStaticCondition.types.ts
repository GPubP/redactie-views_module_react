import { ContentSchema } from '@redactie/content-module';

export interface ContentSelectItem {
	value: string;
	label: string;
}

export interface FormUpdateConditionalValue {
	field: string;
	value: string | ContentSchema | ContentSelectItem;
	uuid: string;
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
