import { Select, TextField } from '@acpaas-ui/react-components';
import { FormSchema } from '@redactie/form-renderer-module';
import { Field, FieldInputProps, Formik, FormikProps } from 'formik';
import React, { FC, ReactElement, useContext, useMemo } from 'react';

import contentConnector from '../../../connectors/content';
import { getForm } from '../../../connectors/formRenderer';
import TenantContext from '../../../context/TenantContext/TenantContext';
import { parseFields } from '../../../helpers/parseFields';
import { ContentTypeFieldResponse } from '../../../services/contentTypes';
import { Operator } from '../../../services/contentTypes/contentTypes.service.types';
import { SelectOptions } from '../../../views.types';

import { DEFAULT_OPERATORS, DEFAULT_VALIDATION_SCHEMA } from './FormCreateCondition.const';
import { FormCreateConditionProps, FormCreateConditionValue } from './FormCreateCondition.types';

const FormCreateCondition: FC<FormCreateConditionProps> = ({
	children,
	onSubmit,
	fields,
	initialValues,
}) => {
	/**
	 * HOOKS
	 */
	interface FieldOption extends SelectOptions {
		operators: Operator[];
	}
	const fieldOptions: FieldOption[] = useMemo(
		() =>
			fields.reduce((acc, field) => {
				if (
					!field.fieldType.data.generalConfig.isQueryable ||
					!field.fieldType.data.operators.length
				) {
					return acc;
				}

				return acc.concat([
					{
						key: field.name as string,
						label: field.label,
						value: field.name as string,
						operators: field.fieldType.data.operators,
					},
				]);
			}, [] as FieldOption[]),
		[fields]
	);
	const formValues: FormCreateConditionValue = useMemo(
		() => ({
			field: initialValues?.field || fieldOptions[0]?.value,
			operator: initialValues?.operator || fieldOptions[0]?.operators[0]?.value || '',
			value: initialValues?.value || '',
			uuid: initialValues?.uuid || '',
		}),
		[fieldOptions, initialValues]
	);
	const { siteId, tenantId } = useContext(TenantContext);
	const ContentTenantContext = contentConnector.api.contentTenantContext;

	/**
	 * METHODS
	 */
	const parseFieldToForm = (
		selectedField: ContentTypeFieldResponse,
		{ label }: { label: string }
	): FormSchema => {
		return {
			fields: parseFields([
				{
					...(selectedField || {}),
					generalConfig: {
						...selectedField.generalConfig,
						hidden: false,
						disabled: false,
						required: true,
					},
					name: 'value',
					label,
				},
			]),
		};
	};

	/**
	 * RENDER
	 */
	const RenderValueField: FC<FieldInputProps<any> & {
		selectedField: string;
		setFieldValue: (value: any) => void;
		label: string;
		placeholder: string;
	}> = ({
		value,
		name,
		label,
		placeholder,
		selectedField: field,
		setFieldValue,
	}): ReactElement | null => {
		const FormRenderer = getForm();
		const selectedField = field ? fields.find(f => f.name === field) : fields[0];

		if (!selectedField) {
			return null;
		}

		const formSchema = parseFieldToForm(selectedField, { label });

		if (!FormRenderer || !formSchema?.fields.length || !selectedField) {
			return (
				<Field
					id={name}
					name={name}
					label={label}
					placeholder={placeholder}
					as={TextField}
				/>
			);
		}
		const { defaultValue } = selectedField;
		const initialValues = value ? { value } : defaultValue ? { value: defaultValue } : {};

		return (
			<ContentTenantContext.Provider value={{ siteId, tenantId }}>
				<FormRenderer
					schema={formSchema}
					initialValues={initialValues}
					validationSchema={DEFAULT_VALIDATION_SCHEMA}
					errorMessages={{}}
					onChange={input => setFieldValue(input?.value)}
				/>
			</ContentTenantContext.Provider>
		);
	};

	return (
		<Formik initialValues={formValues} onSubmit={onSubmit}>
			{props => (
				<div className="u-margin-top">
					<div className="row">
						<div className="col-xs-12 col-sm-6 u-margin-bottom">
							<Field
								id="field"
								name="field"
								label="Veld"
								loading={fieldOptions.length === 0}
								options={fieldOptions}
								as={Select}
							/>
						</div>
						<div className="col-xs-12 col-sm-6 u-margin-bottom">
							<Field
								id="operator"
								name="operator"
								label="Operator"
								options={
									fieldOptions.find(option => option.value === props.values.field)
										?.operators || DEFAULT_OPERATORS
								}
								as={Select}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<Field
								id="value"
								name="value"
								label="Waarde"
								placeholder="Geef een waarde op"
								selectedField={props.values.field}
								setFieldValue={(value: any) => props.setFieldValue('value', value)}
								as={RenderValueField}
							/>
						</div>
					</div>
					{typeof children === 'function'
						? (children as (
								formikBag: FormikProps<FormCreateConditionValue>
						  ) => React.ReactNode)(props)
						: null}
				</div>
			)}
		</Formik>
	);
};

export default FormCreateCondition;
