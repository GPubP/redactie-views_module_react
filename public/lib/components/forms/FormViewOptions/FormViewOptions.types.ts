import { ViewQueryOptions } from '../../../services/views';

export interface FormViewOptionsFormState extends Omit<ViewQueryOptions, 'orderBy'> {
	orderBy: string;
}

export interface FormViewOptionsProps {
	sortOptions: any[];
	orderOptions: any[];
	formState: FormViewOptionsFormState;
	onSubmit: (formValues: any) => void;
}
