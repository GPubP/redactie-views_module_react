import { Button } from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import { move } from 'ramda';
import React, { FC, ReactElement, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors/translations';
import { RowDnDEvent } from '../../../views.types';
import FormCreateCondition from '../FormCreateCondition/FormCreateCondition';

import { FIELD_COLUMNS } from './FormViewConditions.const';
import { FormViewConditionsProps, FormViewConditionsRow } from './FormViewConditions.types';

const FormViewConditions: FC<FormViewConditionsProps> = ({
	fields,
	formState,
	readonly = false,
	onDelete,
	onSubmit,
	onReorderConditions,
}) => {
	/**
	 * Hooks
	 */

	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
	const [t] = useCoreTranslation();

	/**
	 * Methods
	 */

	const onDeleteCondition = (index: number): void => {
		onDelete(index);
		setExpandedRows({});
	};

	const onShowEdit = (rowData: FormViewConditionsRow): void => {
		setExpandedRows({
			[rowData.uuid]: true,
		});
	};

	const onMoveRow = (from: number, to: number): void => {
		const newQueryConditions = move(from, to, formState.query.conditions);
		onReorderConditions(newQueryConditions);
	};

	const onMoveRowDnD = (source: RowDnDEvent, target: RowDnDEvent): void => {
		onMoveRow(source.index, target.index);
	};

	const conditionRows: FormViewConditionsRow[] = formState.query.conditions.map(
		(condition, index) => ({
			...condition,
			index,
			onShowEdit,
			canMoveUp: index > 0,
			canMoveDown: formState.query.conditions.length - 1 !== index,
		})
	);

	/**
	 * Render
	 */

	const renderConditionForm = (rowData: FormViewConditionsRow): ReactElement => {
		return (
			<FormCreateCondition
				className="u-padding-xs"
				initialValues={{
					...rowData,
					field: `${rowData.field.group}.${rowData.field._id}`,
					operator: rowData.operator.value,
					uuid: rowData.uuid,
				}}
				fields={fields}
				onSubmit={values => onSubmit(values, rowData.index)}
			>
				{({ submitForm }) => (
					<div>
						<Button
							className="u-margin-right-xs"
							onClick={() => {
								submitForm();
								setExpandedRows({});
							}}
							size="small"
						>
							Wijzig
						</Button>
						<Button
							className="u-margin-right-xs"
							onClick={() => setExpandedRows({})}
							outline
							size="small"
						>
							{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
						</Button>
						<Button
							className="u-margin-right-xs"
							icon="trash"
							onClick={() => onDeleteCondition(rowData.index)}
							type="secondary"
							negative
							size="small"
						/>
					</div>
				)}
			</FormCreateCondition>
		);
	};

	return (
		<>
			<Table
				className="u-margin-top"
				dataKey="uuid"
				draggable
				moveRow={onMoveRowDnD}
				expandedRows={expandedRows}
				columns={FIELD_COLUMNS(readonly, onMoveRow)}
				rows={conditionRows}
				responsive={false}
				rowExpansionTemplate={(rowData: FormViewConditionsRow) =>
					renderConditionForm(rowData)
				}
				noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
			/>
		</>
	);
};

export default FormViewConditions;
