import { ViewSchema } from '../../../services/view';

export interface FormViewConditionsProps {
	formState: ViewSchema;
	onSubmit: (formValues: any) => void;
}
