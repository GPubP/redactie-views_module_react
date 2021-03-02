import { Button } from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import React, { FC, ReactElement, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors/translations';
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
					field: `${rowData.field.group}.${rowData.field._id}`,
					operator: rowData.operator.value,
					uuid: rowData.uuid,
				}}
				fields={fields}
				onSubmit={values => onSubmit(values, rowData.index)}
			>
				{({ submitForm }) => (
					<div className="u-margin-top">
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
							type="secondary"
							negative
							size="small"
						/>
					</div>
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
				responsive={false}
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
								type="secondary"
								negative
								size="small"
							/>
						</>
					)}
				</FormCreateCondition>
			)}
		</>
	);
};

export default FormViewConditions;
