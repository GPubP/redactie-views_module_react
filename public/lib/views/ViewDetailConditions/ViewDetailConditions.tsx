import { Card, Button } from '@acpaas-ui/react-components';
import React, { FC, useState } from 'react';

import { FormCreateCondition, FormViewConditions } from '../../components';
import { DEFAULT_OPERATORS } from '../../components/forms/FormCreateCondition/FormCreateCondition.const';
import { FormCreateConditionValue } from '../../components/forms/FormCreateCondition/FormCreateCondition.types';
import { ContentTypeFieldSchema } from '../../services/contentTypes';
import { internalService } from '../../store/internal';
import { SelectOptions } from '../../views.types';

import { ViewDetailConditionsProps } from './ViewDetailConditions.types';

const ViewDetailConditions: FC<ViewDetailConditionsProps> = ({ view, contentType, onSubmit }) => {
	const [showCreateConditionForm, setshowCreateConditionForm] = useState(false);

	const addCondition = (value: FormCreateConditionValue): void => {
		setshowCreateConditionForm(false);
		const condition = {
			field: contentType.fields.find(
				field => field.uuid === value.field
			) as ContentTypeFieldSchema,
			value: value.value,
			operator:
				DEFAULT_OPERATORS.find(operator => operator.value === value.operator) ||
				DEFAULT_OPERATORS[0],
		};

		internalService.updateView({
			...view,
			query: {
				...view.query,
				conditions: [...view.query.conditions, condition],
			},
		});
	};

	const showForm = (): void => {
		setshowCreateConditionForm(!showCreateConditionForm);
	};

	/**
	 * Render
	 */
	return (
		<Card>
			<div className="u-margin">
				<h5>Voorwaarden</h5>

				<FormViewConditions formState={view} onSubmit={onSubmit} />

				{showCreateConditionForm && (
					<FormCreateCondition
						onSubmit={addCondition}
						fields={
							contentType?.fields.map(
								(field): SelectOptions => ({
									key: field.uuid as string,
									label: field.label,
									value: field.uuid as string,
								})
							) || []
						}
					/>
				)}

				{!showCreateConditionForm && (
					<Button
						className="u-margin-top"
						onClick={showForm}
						iconLeft="plus"
						type="primary"
					>
						Voorwaarde toevoegen
					</Button>
				)}
			</div>
		</Card>
	);
};

export default ViewDetailConditions;
