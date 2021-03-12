import { ContentTypeFieldResponse } from '../../../services/contentTypes';
import { ViewQueryCondition, ViewSchema } from '../../../services/views';
import { FormCreateConditionValue } from '../FormCreateCondition/FormCreateCondition.types';

export interface FormViewConditionsProps {
	fields: ContentTypeFieldResponse[];
	formState: ViewSchema;
	readonly?: boolean;
	onDelete: (conditionIndex: number) => void;
	onSubmit: (updatedCondition: FormCreateConditionValue, conditionIndex?: number) => void;
}

export interface FormViewConditionsRow extends ViewQueryCondition {
	index: number;
	onShowEdit: (rowData: FormViewConditionsRow, rowindex: number) => void;
}
