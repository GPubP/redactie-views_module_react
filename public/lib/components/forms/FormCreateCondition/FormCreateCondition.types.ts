import { FormikProps, FormikValues } from 'formik';

import { ContentTypeFieldResponse } from '../../../services/contentTypes';

export interface FormCreateConditionValue {
	field: string;
	operator: string;
	value: string;
	uuid?: string;
}

export interface FormCreateConditionProps<Values = FormikValues> {
	children?: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
	fields: ContentTypeFieldResponse[];
	initialValues?: FormCreateConditionValue;
	onSubmit: (formValues: FormCreateConditionValue) => void;
}
