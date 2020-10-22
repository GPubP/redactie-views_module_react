import { ViewSchema } from '../../../services/views';
import { SelectOptions } from '../../../views.types';

export interface FormViewNewListProps {
	methodOptions: SelectOptions[];
	contentTypeOptions: SelectOptions[];
	formState?: ViewSchema;
	onSubmit: (formValues: any) => void;
}
