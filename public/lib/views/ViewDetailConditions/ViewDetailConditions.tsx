import { Button, Card } from '@acpaas-ui/react-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { FormCreateCondition, FormViewConditions } from '../../components';
import { DEFAULT_OPERATORS } from '../../components/forms/FormCreateCondition/FormCreateCondition.const';
import { FormCreateConditionValue } from '../../components/forms/FormCreateCondition/FormCreateCondition.types';
import { useCoreTranslation } from '../../connectors/translations';
import { ViewQueryCondition } from '../../services/views';

import { ViewDetailConditionsProps } from './ViewDetailConditions.types';

const ViewDetailConditions: FC<ViewDetailConditionsProps> = ({ view, contentType, onSubmit }) => {
	/**
	 * Hooks
	 */
	const [showCreateConditionForm, setshowCreateConditionForm] = useState(false);
	const [t] = useCoreTranslation();

	/**
	 * Methods
	 */
	const parseCondition = (rawCondition: FormCreateConditionValue): ViewQueryCondition => {
		const ctField = contentType.fields.find(field => field.name === rawCondition.field);

		return {
			field: {
				fieldType: ctField?.fieldType?.uuid || '',
				dataType: ctField?.dataType?.uuid || '',
				preset: ctField?.preset?.uuid || null,
				group: 'fields',
				label: ctField?.label || '',
				type: ctField?.dataType.data.type || 'string',
				_id: ctField?.name || '',
			},
			value: rawCondition.value,
			operator:
				(ctField?.fieldType?.data.operators || []).find(
					operator => operator.value === rawCondition.operator
				) || DEFAULT_OPERATORS[0],
			uuid: rawCondition.uuid,
		};
	};

	const addCondition = (newCondition: FormCreateConditionValue): void => {
		onSubmit({
			...view,
			query: {
				...view.query,
				conditions: [
					...view.query.conditions,
					parseCondition({
						...newCondition,
						uuid: uuid(),
					}),
				],
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
		updatedConditionIndex?: number
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

	/**
	 * Render
	 */
	return (
		<Card>
			<div className="u-margin">
				<h5>Voorwaarden</h5>

				<FormViewConditions
					formState={view}
					fields={contentType.fields}
					onDelete={deleteCondition}
					onSubmit={updateCondition}
				/>

				{showCreateConditionForm && (
					<FormCreateCondition onSubmit={addCondition} fields={contentType.fields}>
						{({ submitForm }) => (
							<>
								<Button
									className="u-margin-right-xs u-margin-bottom"
									type="success"
									onClick={submitForm}
								>
									{t(CORE_TRANSLATIONS.BUTTON_ADD)}
								</Button>
								<Button
									className="u-margin-bottom"
									onClick={() => setshowCreateConditionForm(false)}
									outline
								>
									{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
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
