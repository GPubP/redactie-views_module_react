import { TextField } from '@acpaas-ui/react-components';
import { ContentTypeFieldSchema, FormSchema } from '@redactie/form-renderer-module';
import { Field, FieldInputProps } from 'formik';
import React, { FC, useEffect, useMemo } from 'react';

import formRendererConnector from '../../connectors/formRenderer';
import { ContentTypeFieldResponse } from '../../services/contentTypes/contentTypes.service.types';
import { DEFAULT_VALIDATION_SCHEMA } from '../forms/FormCreateCondition/FormCreateCondition.const';

const parseFieldToForm = (
	selectedField: ContentTypeFieldResponse,
	{ label }: { label: string }
): FormSchema => {
	return {
		fields: formRendererConnector.api.parseFields([
			({
				...(selectedField || {}),
				generalConfig: {
					...selectedField?.generalConfig,
					hidden: false,
					disabled: false,
					required: false,
				},
				name: 'value',
				label,
				// TODO: look into why types mismatch
			} as unknown) as ContentTypeFieldSchema,
		]),
	};
};

const FieldValueField: FC<FieldInputProps<any> & {
	fields: ContentTypeFieldResponse[];
	selectedField: string;
	setFieldValue: (value: any) => void;
	label: string;
	placeholder: string;
}> = ({ fields, value, label, placeholder, selectedField: field, setFieldValue }) => {
	/**
	 * Hooks
	 */
	const selectedFieldsField = useMemo(() => {
		return field ? fields.find(f => f.name === field) : fields[0];
	}, [field, fields]);
	const formSchema = useMemo(
		() => (selectedFieldsField ? parseFieldToForm(selectedFieldsField, { label }) : null),
		[label, selectedFieldsField]
	);

	const initialValues = value
		? { value: value }
		: selectedFieldsField?.defaultValue
		? { value: selectedFieldsField.defaultValue }
		: {};

	const FormRenderer = formRendererConnector.api.Form;

	useEffect(() => {
		if (value) {
			return;
		}

		setFieldValue(initialValues?.value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * Methods
	 */
	if (!FormRenderer || !formSchema?.fields.length || !field) {
		return (
			<Field
				className="u-margin-bottom"
				id={name}
				name={name}
				label={label}
				placeholder={placeholder}
				as={TextField}
			/>
		);
	}

	/**
	 * Render
	 */
	return (
		<FormRenderer
			schema={formSchema}
			initialValues={initialValues}
			validationSchema={DEFAULT_VALIDATION_SCHEMA}
			errorMessages={{}}
			onChange={input => setFieldValue(input?.value)}
		/>
	);
};

export default FieldValueField;
