import { Button } from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import React, { FC, useState } from 'react';

import { ViewQueryCondition } from '../../../services/views';
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
	const [activeCondition, setActiveCondition] = useState<ViewQueryCondition | null>(null);
	const [activeConditionIndex, setActiveConditionIndex] = useState<number | null>(null);

	/**
	 * Methods
	 */
	const onDeleteCondition = (): void => {
		onDelete(activeConditionIndex as number);
		setShowEditCondition(false);
	};

	const onShowEdit = (rowData: FormViewConditionsRow, rowIndex: number): void => {
		setActiveCondition({
			field: rowData.field,
			operator: rowData.operator,
			value: rowData.value,
		});
		setActiveConditionIndex(rowIndex);
		setShowEditCondition(true);
	};

	const conditionRows: FormViewConditionsRow[] = formState.query.conditions.map(condition => ({
		...condition,
		onShowEdit,
	}));

	/**
	 * Render
	 */
	return (
		<>
			<Table className="u-margin-top" columns={FIELD_COLUMNS} rows={conditionRows} />
			{showEditCondition && activeCondition && (
				<FormCreateCondition
					initialValues={{
						...activeCondition,
						field: activeCondition.field.label,
						operator: activeCondition.operator.value,
					}}
					fields={fields}
					onSubmit={values => onSubmit(values, activeConditionIndex as number)}
				>
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
