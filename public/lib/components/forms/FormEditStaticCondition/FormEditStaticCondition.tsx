import { Button } from '@acpaas-ui/react-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { Field, FieldProps, Formik } from 'formik';
import React, { FC, ReactElement, useContext, useMemo } from 'react';

import contentConnector from '../../../connectors/content';
import { getFieldRegistery } from '../../../connectors/formRenderer';
import { useCoreTranslation } from '../../../connectors/translations';
import TenantContext from '../../../context/TenantContext/TenantContext';
import { useViewDraft } from '../../../hooks';

import { FormEditStaticConditionProps } from './FormEditStaticCondition.types';

export const FormEditStaticCondition: FC<FormEditStaticConditionProps> = ({
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
	const { siteId, tenantId } = useContext(TenantContext);
	const [view] = useViewDraft();
	const ContentTenantContext = contentConnector.api.contentTenantContext;
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
							<ContentTenantContext.Provider value={{ siteId, tenantId }}>
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
							</ContentTenantContext.Provider>
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
									type="danger"
									transparent
								/>
							)}
						</div>
					</div>
				</>
			)}
		</Formik>
	);
};
