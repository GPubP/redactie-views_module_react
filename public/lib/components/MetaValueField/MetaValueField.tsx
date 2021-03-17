import { FieldInputProps, FormikValues, useField, useFormikContext } from 'formik';
import React, { FC, useMemo } from 'react';

import { getFieldRegistery } from '../../connectors/formRenderer';
import { META_FILTER_OPTIONS } from '../forms/FormCreateCondition/FormCreateCondition.const';

const MetaValueField: FC<FieldInputProps<string> & {
	selectedField: string;
	setFieldValue: (value: any) => void;
	label: string;
	placeholder: string;
}> = props => {
	/**
	 * Hooks
	 */
	const fieldRegistry = getFieldRegistery();
	const form = useFormikContext<FormikValues>();
	const [field, meta, helpers] = useField(props.name);
	const selectedMetaField = useMemo(
		() => META_FILTER_OPTIONS.find(opt => opt.value === props.selectedField),
		[props.selectedField]
	);
	const FieldItem = useMemo(
		() => (selectedMetaField ? fieldRegistry?.get('core', selectedMetaField.type) : null),
		[fieldRegistry, selectedMetaField]
	);

	/**
	 * Render
	 */
	if (!FieldItem?.component) {
		return null;
	}

	return (
		<FieldItem.component
			fieldProps={{
				field,
				meta,
				form,
			}}
			fieldHelperProps={helpers}
			fieldSchema={
				{
					name: selectedMetaField?.type,
					module: 'core',
					type: 'string',
					config: {},
					dataType: null,
					label: props.label,
				} as any
			}
		/>
	);
};

export default MetaValueField;
