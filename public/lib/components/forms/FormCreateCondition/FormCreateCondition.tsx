import { Select } from '@acpaas-ui/react-components';
import { Field, FieldInputProps, Formik, FormikProps } from 'formik';
import React, { FC, ReactElement, useMemo } from 'react';

import { FieldValueField } from '../../FieldValueField';
import { MetaValueField } from '../../MetaValueField';

import { DEFAULT_OPERATORS, META_FILTER_OPTIONS } from './FormCreateCondition.const';
import {
	FieldOption,
	FormCreateConditionProps,
	FormCreateConditionValue,
} from './FormCreateCondition.types';

const FormCreateCondition: FC<FormCreateConditionProps> = ({
	children,
	className,
	onSubmit,
	fields,
	initialValues,
}) => {
	/**
	 * HOOKS
	 */
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
						key: `fields.${field.name}`,
						label: field.label,
						value: `fields.${field.name}`,
						operators: field.fieldType.data.operators,
					},
				]);
			}, META_FILTER_OPTIONS as FieldOption[]),
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

	/**
	 * RENDER
	 */

	const RenderValue: FC<FieldInputProps<any> & {
		selectedField: string;
		setFieldValue: (value: any) => void;
		label: string;
		placeholder: string;
	}> = (props): ReactElement | null => {
		const valueToPathTest = /^(meta|fields)\.(.*)$/.exec(props.selectedField);

		if (valueToPathTest && valueToPathTest[1] === 'meta') {
			return <MetaValueField {...props} />;
		}

		if (valueToPathTest && valueToPathTest[1] === 'fields') {
			return (
				<FieldValueField {...props} fields={fields} selectedField={valueToPathTest[2]} />
			);
		}

		return null;
	};

	return (
		<Formik initialValues={formValues} onSubmit={onSubmit}>
			{props => (
				<div className={className}>
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
								as={RenderValue}
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
