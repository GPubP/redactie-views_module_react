import { ViewConditionSchema, ViewSchema } from '../../../services/view';
import { SelectOptions } from '../../../views.types';
import { FormCreateConditionValue } from '../FormCreateCondition/FormCreateCondition.types';

export interface FormViewConditionsProps {
	fields: SelectOptions[];
	formState: ViewSchema;
	onDelete: (conditionIndex: number) => void;
	onSubmit: (updatedCondition: FormCreateConditionValue, conditionIndex: number) => void;
}

export interface FormViewConditionsRow extends ViewConditionSchema {
	onShowEdit: (rowData: FormViewConditionsRow, rowindex: number) => void;
}
