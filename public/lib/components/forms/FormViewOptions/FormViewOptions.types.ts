import { ViewSchema } from '../../../services/view';

export interface FormViewOptionsProps {
	sortOptions: any[];
	orderOptions: any[];
	formState: ViewSchema;
	onSubmit: (formValues: any) => void;
}
