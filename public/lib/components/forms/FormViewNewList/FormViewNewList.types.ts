import { SelectOption } from '@redactie/utils';

import { ViewSchema } from '../../../services/views';

export interface FormViewNewListProps {
	methodOptions: SelectOption[];
	contentTypeOptions: SelectOption[];
	formState?: ViewSchema;
	onSubmit: (formValues: any) => void;
}
