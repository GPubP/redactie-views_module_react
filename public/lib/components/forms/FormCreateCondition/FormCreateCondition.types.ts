import { FormikProps, FormikValues } from 'formik';

import { SelectOptions } from '../../../views.types';

export interface FormCreateConditionValue {
	field: string;
	operator: string;
	value: string;
}

export interface FormCreateConditionProps<Values = FormikValues> {
	children?: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
	fields: SelectOptions[];
	initialValues?: FormCreateConditionValue;
	onSubmit: (formValues: FormCreateConditionValue) => void;
}
