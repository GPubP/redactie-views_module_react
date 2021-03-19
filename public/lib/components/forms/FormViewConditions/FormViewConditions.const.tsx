import { Button, ButtonGroup } from '@acpaas-ui/react-components';
import { TableColumn } from '@redactie/utils';
import React from 'react';

import { FormViewConditionsRow } from './FormViewConditions.types';

export const FIELD_COLUMNS = (
	readonly: boolean,
	moveRow: (form: number, to: number) => void
): TableColumn<FormViewConditionsRow>[] => [
	{
		label: ' ',
		value: 'actions',
		disableSorting: true,
		component(cellValue, { canMoveUp, canMoveDown, index }) {
			return (
				<>
					<div className="u-flex u-flex-align-center u-flex-no-wrap">
						<ButtonGroup direction="vertical">
							<Button
								onClick={() => moveRow(index, index - 1)}
								icon="chevron-up"
								ariaLabel="Move item up"
								type="primary"
								htmlType="button"
								size="tiny"
								transparent
								disabled={!canMoveUp}
								negative
							/>
							<Button
								onClick={() => moveRow(index, index + 1)}
								icon="chevron-down"
								ariaLabel="Move item down"
								type="primary"
								htmlType="button"
								size="tiny"
								disabled={!canMoveDown}
								transparent
								negative
							/>
						</ButtonGroup>
					</div>
				</>
			);
		},
	},
	{
		label: 'Veld',
		value: 'field',
		disableSorting: true,
		format: (cellValue, col, rowData) => {
			return rowData?.field?.label || '';
		},
	},
	{
		label: 'Operator',
		value: 'operator',
		disableSorting: true,
		format: (cellValue, col, rowData) => {
			return rowData?.operator?.label || '';
		},
	},
	{
		label: 'Type',
		value: 'type',
		disableSorting: true,
		format: (cellValue, col, rowData) => {
			return rowData.field.type;
		},
	},
	{
		label: 'Waarde',
		disableSorting: true,
		format: (cellValue, col, rowData) => {
			return rowData.label || rowData.value.toString();
		},
	},
	...(!readonly
		? ([
				{
					label: '',
					classList: ['u-text-right'],
					component(value, rowData, rowIndex) {
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
		  ] as TableColumn<FormViewConditionsRow>[])
		: []),
];
