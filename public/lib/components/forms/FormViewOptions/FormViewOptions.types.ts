import { ViewSchema } from '../../../services/views';

export interface FormViewOptionsProps {
	sortOptions: any[];
	orderOptions: any[];
	formState: ViewSchema;
	onSubmit: (formValues: any) => void;
}
