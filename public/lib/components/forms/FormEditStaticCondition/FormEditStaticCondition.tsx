import { Button } from '@acpaas-ui/react-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import { Field, FieldProps, Formik } from 'formik';
import React, { FC, ReactElement, useMemo } from 'react';

import { getFieldRegistery } from '../../../connectors/formRenderer';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors/translations';
import { useViewDraft } from '../../../hooks';

import { FormEditStaticConditionProps } from './FormEditStaticCondition.types';

const FormEditStaticCondition: FC<FormEditStaticConditionProps> = ({
	formData,
	onSubmit,
	onDelete,
	onCancel,
	submitLabel,
	submitType,
}): ReactElement | null => {
	/**
	 * Hooks
	 */
	const [view] = useViewDraft();
	const [t] = useCoreTranslation();
	const ContentSelect: React.FC<InputFieldProps> | null | undefined = useMemo(() => {
		const fieldRegistry = getFieldRegistery();

		if (!fieldRegistry) {
			return null;
		}

		return fieldRegistry.get('content', 'contentReference')?.component;
	}, []);

	if (!view || !ContentSelect) {
		return null;
	}

	return (
		<Formik
			initialValues={
				{
					field: formData.field,
					value: formData.value,
					uuid: formData.uuid,
					index: formData.index,
				} as any
			}
			onSubmit={onSubmit}
		>
			{({ getFieldHelpers, submitForm }) => (
				<>
					<div className="row">
						<div className="col-xs-12">
							<Field name="value">
								{(fieldProps: FieldProps<any, {}>) => {
									return (
										<ContentSelect
											fieldProps={fieldProps}
											fieldHelperProps={getFieldHelpers('value')}
											fieldSchema={
												{
													label: 'Waarde',
													name: 'value',
													config: {},
												} as any
											}
										/>
									);
								}}
							</Field>
						</div>
					</div>
					<div className="row u-margin-top">
						<div className="col-xs-12">
							<Button
								className="u-margin-right-xs"
								type={submitType || 'primary'}
								onClick={() => {
									submitForm();
								}}
							>
								{submitLabel || 'Wijzig'}
							</Button>
							<Button className="u-margin-right-xs" onClick={onCancel} outline>
								{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
							</Button>
							{onDelete && (
								<Button
									icon="trash"
									onClick={() => onDelete(formData.index)}
									type="secondary"
									negative
									size="small"
								/>
							)}
						</div>
					</div>
				</>
			)}
		</Formik>
	);
};

export default FormEditStaticCondition;
