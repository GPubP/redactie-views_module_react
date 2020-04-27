import { Button, Card } from '@acpaas-ui/react-components';
import React, { FC, useState } from 'react';

import { FormCreateCondition, FormViewConditions } from '../../components';
import { DEFAULT_OPERATORS } from '../../components/forms/FormCreateCondition/FormCreateCondition.const';
import { FormCreateConditionValue } from '../../components/forms/FormCreateCondition/FormCreateCondition.types';
import { ContentTypeFieldSchema } from '../../services/contentTypes';
import { ViewConditionSchema } from '../../services/view';
import { SelectOptions } from '../../views.types';

import { ViewDetailConditionsProps } from './ViewDetailConditions.types';

const ViewDetailConditions: FC<ViewDetailConditionsProps> = ({ view, contentType, onSubmit }) => {
	/**
	 * Hooks
	 */
	const [showCreateConditionForm, setshowCreateConditionForm] = useState(false);

	/**
	 * Methods
	 */
	const parseCondition = (rawCondition: FormCreateConditionValue): ViewConditionSchema => {
		return {
			field: contentType.fields.find(
				field => field.uuid === rawCondition.field
			) as ContentTypeFieldSchema,
			value: rawCondition.value,
			operator:
				DEFAULT_OPERATORS.find(operator => operator.value === rawCondition.operator) ||
				DEFAULT_OPERATORS[0],
		};
	};

	const addCondition = (newCondition: FormCreateConditionValue): void => {
		onSubmit({
			...view,
			query: {
				...view.query,
				conditions: [...view.query.conditions, parseCondition(newCondition)],
			},
		});
		setshowCreateConditionForm(false);
	};

	const deleteCondition = (conditionIndex: number): void => {
		onSubmit({
			...view,
			query: {
				...view.query,
				conditions: view.query.conditions.filter((c, index) => index !== conditionIndex),
			},
		});
	};

	const updateCondition = (
		updatedCondition: FormCreateConditionValue,
		updatedConditionIndex: number
	): void => {
		onSubmit({
			...view,
			query: {
				...view.query,
				conditions: view.query.conditions.map((condition, index) =>
					updatedConditionIndex === index ? parseCondition(updatedCondition) : condition
				),
			},
		});
	};

	const showForm = (): void => {
		setshowCreateConditionForm(!showCreateConditionForm);
	};

	const conditionFields =
		contentType?.fields.map(
			(field): SelectOptions => ({
				key: field.uuid as string,
				label: field.label,
				value: field.uuid as string,
			})
		) || [];

	/**
	 * Render
	 */
	return (
		<Card>
			<div className="u-margin">
				<h5>Voorwaarden</h5>

				<FormViewConditions
					formState={view}
					fields={conditionFields}
					onDelete={deleteCondition}
					onSubmit={updateCondition}
				/>

				{showCreateConditionForm && (
					<FormCreateCondition onSubmit={addCondition} fields={conditionFields}>
						{({ submitForm }) => (
							<>
								<Button className="u-margin-right-xs" onClick={submitForm}>
									Voeg toe
								</Button>
								<Button onClick={() => setshowCreateConditionForm(false)} outline>
									Annuleer
								</Button>
							</>
						)}
					</FormCreateCondition>
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
