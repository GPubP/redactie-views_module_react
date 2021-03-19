import { Button, Select } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { ChangeEvent, FC, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors/translations';
import { ViewSchema } from '../../../services/views';

import { FORM_VIEW_NEW_VALIDATION } from './FormViewNewList.const';
import { FormViewNewListProps } from './FormViewNewList.types';

const FormViewNewList: FC<FormViewNewListProps> = ({
	contentTypeOptions,
	formState,
	methodOptions,
	isLoading = false,
	readonly = false,
	onSubmit,
}) => {
	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const [isChanged, setIsChanged] = useState<boolean>(false);

	if (!formState) {
		return null;
	}

	const onSave = (newViewValue: ViewSchema): void => {
		onSubmit(newViewValue);
		setIsChanged(false);
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>, setFieldValue: Function): void => {
		const value = e.target.value;
		const initialViewType = formState.query.viewType;
		const initialContentType = formState.query.contentType?.uuid;

		if (value !== initialViewType && value !== initialContentType) {
			setIsChanged(true);
		} else {
			setIsChanged(false);
		}

		setFieldValue(e.target.name, e.target.value);
	};

	return (
		<Formik
			initialValues={formState}
			onSubmit={onSave}
			validationSchema={FORM_VIEW_NEW_VALIDATION}
		>
			{({ submitForm, values, setFieldValue }) => {
				if (
					values.query.viewType === 'dynamic' &&
					typeof values.query.contentType?.uuid !== 'string' &&
					contentTypeOptions.length >= 2 // first value is an disabled item
				) {
					setFieldValue('query.contentType.uuid', contentTypeOptions[0].value);
				}

				return (
					<>
						<div className="row u-margin-top">
							<div className="col-xs-12 col-md-6 u-margin-bottom">
								<Field
									aria-describedby="descMethod"
									disabled={readonly}
									id="method"
									name="query.viewType"
									label="Methode"
									options={methodOptions}
									as={Select}
									value={values.query.viewType}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										onChange(e, setFieldValue)
									}
								/>
								<div id="descMethod" className="u-text-light u-margin-top-xs">
									Selecteer hoe je de lijst wil opbouwen.
								</div>
							</div>
							{values?.query?.viewType === 'dynamic' ? (
								<div className="col-xs-12 col-md-6 u-margin-bottom">
									<Field
										aria-describedby="descContentType"
										disabled={readonly}
										id="contentType"
										name="query.contentType.uuid"
										loading={isLoading}
										label="Content type"
										options={contentTypeOptions}
										required
										as={Select}
										value={values.query.contentType?.uuid}
										onChange={(e: ChangeEvent<HTMLInputElement>) =>
											onChange(e, setFieldValue)
										}
									/>
									<div
										id="descContentType"
										className="u-text-light u-margin-top-xs"
									>
										Selecteer van welk content type je een lijst wil maken.
									</div>
								</div>
							) : null}
						</div>

						{!readonly && (
							<div className="end-xs">
								<Button onClick={submitForm} disabled={!isChanged || isLoading}>
									{t(CORE_TRANSLATIONS.BUTTON_UPDATE)}
								</Button>
							</div>
						)}
					</>
				);
			}}
		</Formik>
	);
};

export default FormViewNewList;
