import { Button } from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import React, { FC, ReactElement, useState } from 'react';

import { useCoreTranslation } from '../../../connectors/translations';
import FormCreateCondition from '../FormCreateCondition/FormCreateCondition';

import { FIELD_COLUMNS } from './FormViewConditions.const';
import { FormViewConditionsProps, FormViewConditionsRow } from './FormViewConditions.types';

const FormViewConditions: FC<FormViewConditionsProps> = ({
	fields,
	formState,
	onDelete,
	onSubmit,
}) => {
	/**
	 * Hooks
	 */
	const [showEditCondition, setShowEditCondition] = useState(false);
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
	const [t] = useCoreTranslation();
	/**
	 * Methods
	 */
	const onDeleteCondition = (index: number): void => {
		onDelete(index);
		setExpandedRows({});
	};

	const onShowEdit = (rowData: FormViewConditionsRow, rowIndex: number): void => {
		setExpandedRows({
			[rowIndex]: true,
		});
	};

	const conditionRows: FormViewConditionsRow[] = formState.query.conditions.map(
		(condition, index) => ({
			...condition,
			index,
			onShowEdit,
		})
	);

	const renderConditionForm = (rowData: FormViewConditionsRow): ReactElement => {
		return (
			<FormCreateCondition
				initialValues={{
					...rowData,
					field: rowData.field._id,
					operator: rowData.operator.value,
					uuid: rowData.uuid,
				}}
				fields={fields}
				onSubmit={values => onSubmit(values, rowData.index)}
			>
				{({ submitForm }) => (
					<>
						<Button
							className="u-margin-right-xs"
							onClick={() => {
								submitForm();
								setExpandedRows({});
							}}
						>
							Wijzig
						</Button>
						<Button
							className="u-margin-right-xs"
							onClick={() => setExpandedRows({})}
							outline
						>
							{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
						</Button>
						<Button
							className="u-margin-right-xs"
							icon="trash"
							onClick={() => onDeleteCondition(rowData.index)}
							type="danger"
							transparent
						/>
					</>
				)}
			</FormCreateCondition>
		);
	};

	/**
	 * Render
	 */
	return (
		<>
			<Table
				className="u-margin-top"
				dataKey="index"
				expandedRows={expandedRows}
				columns={FIELD_COLUMNS}
				rows={conditionRows}
				rowExpansionTemplate={(rowData: FormViewConditionsRow) =>
					renderConditionForm(rowData)
				}
			/>
			{showEditCondition && (
				<FormCreateCondition fields={fields} onSubmit={values => onSubmit(values)}>
					{({ submitForm }) => (
						<>
							<Button
								className="u-margin-right-xs"
								onClick={() => {
									submitForm();
									setShowEditCondition(false);
								}}
							>
								Wijzig
							</Button>
							<Button
								className="u-margin-right-xs"
								onClick={() => setShowEditCondition(false)}
								outline
							>
								Annuleer
							</Button>
							<Button
								icon="trash"
								onClick={onDeleteCondition}
								type="danger"
								transparent
							/>
						</>
					)}
				</FormCreateCondition>
			)}
		</>
	);
};

export default FormViewConditions;
