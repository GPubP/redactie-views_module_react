import { ViewQueryOptions } from '../../../services/views';

export interface FormViewOptionsFormState extends Omit<ViewQueryOptions, 'orderBy'> {
	orderBy: string;
}

export interface FormViewOptionsProps {
	formState: FormViewOptionsFormState;
	sortOptions: any[];
	orderOptions: any[];
	readonly?: boolean;
	onSubmit: (formValues: any) => void;
}
