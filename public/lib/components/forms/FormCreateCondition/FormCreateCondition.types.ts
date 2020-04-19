import { SelectOptions } from '../../../views.types';

export interface FormCreateConditionValue {
	field: string;
	operator: string;
	value: string;
}

export interface FormCreateConditionProps {
	fields: SelectOptions[];
	onSubmit: (formValues: FormCreateConditionValue) => void;
}
