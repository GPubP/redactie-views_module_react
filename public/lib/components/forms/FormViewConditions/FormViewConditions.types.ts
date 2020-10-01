import { ViewQueryCondition, ViewSchema } from '../../../services/views';
import { SelectOptions } from '../../../views.types';
import { FormCreateConditionValue } from '../FormCreateCondition/FormCreateCondition.types';

export interface FormViewConditionsProps {
	fields: SelectOptions[];
	formState: ViewSchema;
	onDelete: (conditionIndex: number) => void;
	onSubmit: (updatedCondition: FormCreateConditionValue, conditionIndex: number) => void;
}

export interface FormViewConditionsRow extends ViewQueryCondition {
	onShowEdit: (rowData: FormViewConditionsRow, rowindex: number) => void;
}
