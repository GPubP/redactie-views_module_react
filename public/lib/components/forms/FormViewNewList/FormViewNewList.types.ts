import { SelectOption } from '@redactie/utils';

import { ViewSchema } from '../../../services/views';

export interface FormViewNewListProps {
	contentTypeOptions: SelectOption[];
	methodOptions: SelectOption[];
	formState?: ViewSchema;
	readonly?: boolean;
	onSubmit: (formValues: any) => void;
}
