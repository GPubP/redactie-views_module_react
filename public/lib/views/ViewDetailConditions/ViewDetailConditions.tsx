import { Button, Card } from '@acpaas-ui/react-components';
import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { FormCreateCondition, FormViewConditions } from '../../components';
import {
	DEFAULT_OPERATORS,
	META_FILTER_OPTIONS,
} from '../../components/forms/FormCreateCondition/FormCreateCondition.const';
import { FormCreateConditionValue } from '../../components/forms/FormCreateCondition/FormCreateCondition.types';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { ViewQueryCondition } from '../../services/views';
import { ViewsDetailConfigRouteProps } from '../../views.types';

const ViewDetailConditions: FC<ViewsDetailConfigRouteProps> = ({
	view,
	contentType,
	rights,
	onSubmit,
}) => {
	/**
	 * Hooks
	 */
	const [showCreateConditionForm, setshowCreateConditionForm] = useState(false);
	const [t] = useCoreTranslation();

	/**
	 * Methods
	 */
	const getField = (
		fieldName: string,
		operator: string
	): Omit<ViewQueryCondition, 'value' | 'uuid'> => {
		const ctField = contentType.fields.find(field => field.name === fieldName);

		return {
			field: {
				fieldType: ctField?.fieldType?.uuid || '',
				dataType: ctField?.dataType?.uuid || '',
				preset: ctField?.preset?.uuid || null,
				group: 'fields',
				label: ctField?.label || '',
				type: ctField?.fieldType.data.label || 'string',
				_id: ctField?.name || '',
			},
			operator:
				(ctField?.fieldType?.data.operators || []).find(op => op.value === operator) ||
				DEFAULT_OPERATORS[0],
		};
	};

	const getMetaField = (
		fieldName: string,
		_id: string,
		operator: string
	): Omit<ViewQueryCondition, 'value' | 'uuid'> => {
		const metaField = META_FILTER_OPTIONS.find(opt => opt.value === fieldName);

		return {
			field: {
				_id,
				fieldType: '',
				dataType: '',
				preset: null,
				group: 'meta',
				label: metaField?.label || '',
				type: metaField?.typeLabel || 'string',
			},
			operator:
				metaField?.operators.find(op => op.value === operator) || DEFAULT_OPERATORS[0],
		};
	};

	const parseCondition = (rawCondition: FormCreateConditionValue): ViewQueryCondition | null => {
		const valueToPathTest = /^(meta|fields)\.(.*)$/.exec(rawCondition.field);

		if (!valueToPathTest) {
			return null;
		}

		const { field, operator } =
			valueToPathTest[1] === 'fields'
				? getField(valueToPathTest[2], rawCondition.operator)
				: getMetaField(rawCondition.field, valueToPathTest[2], rawCondition.operator);

		return {
			field,
			operator,
			value: rawCondition.value,
			uuid: rawCondition.uuid,
		};
	};

	const addCondition = (newCondition: FormCreateConditionValue): void => {
		const parsedNewCondition = parseCondition({
			...newCondition,
			uuid: uuid(),
		});

		if (!parsedNewCondition) {
			return;
		}

		onSubmit({
			...view,
			query: {
				...view.query,
				conditions: [...view.query.conditions, parsedNewCondition],
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
		const parsedUpdatedCondition = parseCondition(updatedCondition);

		if (!parsedUpdatedCondition) {
			return;
		}

		onSubmit({
			...view,
			query: {
				...view.query,
				conditions: view.query.conditions.map((condition, index) =>
					updatedConditionIndex === index ? parsedUpdatedCondition : condition
				),
			},
		});
	};

	const updateConditions = (conditions: ViewQueryCondition[]): void => {
		onSubmit({
			...view,
			query: {
				...view.query,
				conditions,
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
				<h2 className="h3">Voorwaarden</h2>

				<FormViewConditions
					formState={view}
					fields={contentType.fields}
					readonly={!rights.canUpdate}
					onDelete={deleteCondition}
					onSubmit={updateCondition}
					onReorderConditions={updateConditions}
				/>

				{showCreateConditionForm && (
					<FormCreateCondition onSubmit={addCondition} fields={contentType.fields}>
						{({ submitForm }) => (
							<div className="u-margin-top">
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
							</div>
						)}
					</FormCreateCondition>
				)}

				{rights.canUpdate && !showCreateConditionForm && (
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
