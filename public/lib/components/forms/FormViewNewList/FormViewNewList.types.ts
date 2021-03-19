import { SelectOption } from '@redactie/utils';

import { ViewQuery } from '../../../services/views';

export interface FormViewNewListFormState {
	query: {
		viewType: ViewQuery['viewType'];
		contentType: { uuid: string };
	};
}

export interface FormViewNewListProps {
	contentTypeOptions: SelectOption[];
	methodOptions: SelectOption[];
	formState: FormViewNewListFormState;
	isLoading?: boolean;
	readonly?: boolean;
	onSubmit: (formValues: any) => void;
}
