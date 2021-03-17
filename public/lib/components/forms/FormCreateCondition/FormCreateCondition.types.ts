import { SelectOption } from '@redactie/utils';
import { FormikProps, FormikValues } from 'formik';

import { ContentTypeFieldResponse, Operator } from '../../../services/contentTypes';

export interface FormCreateConditionValue {
	field: string;
	operator: string;
	value: string;
	uuid?: string;
}

export interface FormCreateConditionProps<Values = FormikValues> {
	className?: string;
	children?: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
	fields: ContentTypeFieldResponse[];
	initialValues?: FormCreateConditionValue;
	onSubmit: (formValues: FormCreateConditionValue) => void;
}

export interface FieldOption extends SelectOption {
	key: string;
	operators: Operator[];
}
