import { Button } from '@acpaas-ui/react-components';
import React from 'react';

import { FormViewConditionsRow } from '../../components/forms/FormViewConditions/FormViewConditions.types';

export const FIELD_COLUMNS = [
	{
		label: 'Veld',
		value: 'field',
		disableSorting: true,
		format: (cellValue: any, col: any, rowData: FormViewConditionsRow) => {
			return rowData?.field?.label || '';
		},
	},
	{
		label: 'Operator',
		value: 'operator',
		disableSorting: true,
		format: (cellValue: any, col: any, rowData: FormViewConditionsRow) => {
			return rowData?.operator?.label || '';
		},
	},
	{
		label: 'Type',
		value: 'type',
		disableSorting: true,
		format: (cellValue: any, col: any, rowData: FormViewConditionsRow) => {
			return rowData.field.type;
		},
	},
	{
		label: 'Waarde',
		value: 'value',
		disableSorting: true,
	},
	{
		label: '',
		classList: ['u-text-right'],
		component(value: any, rowData: FormViewConditionsRow, rowIndex: number) {
			return (
				<Button
					ariaLabel="Edit"
					icon="edit"
					onClick={() => rowData.onShowEdit(rowData, rowIndex)}
					type="primary"
					transparent
				/>
			);
		},
		disableSorting: true,
	},
];
