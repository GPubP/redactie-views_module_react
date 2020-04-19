import { ViewConditionSchema } from '../../../services/view';

export const FIELD_COLUMNS = [
	{
		label: 'Veld',
		value: 'field',
		format: (cellValue: any, col: any, rowData: ViewConditionSchema) => {
			return rowData?.field?.label || '';
		},
	},
	{
		label: 'Operator',
		value: 'operator',
		format: (cellValue: any, col: any, rowData: ViewConditionSchema) => {
			return rowData?.operator?.label || '';
		},
	},
	{
		label: 'Type',
		value: 'type',
		format: (cellValue: any, col: any, rowData: ViewConditionSchema) => {
			return rowData?.field?.fieldType?.data?.label || '';
		},
	},
	{
		label: 'Waarde',
		value: 'value',
	},
];
