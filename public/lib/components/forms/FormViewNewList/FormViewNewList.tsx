import { Button, Select } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { FC } from 'react';

import { FORM_VIEW_NEW_VALIDATION } from './FormViewNewList.const';
import { FormViewNewListProps } from './FormViewNewList.types';

const FormViewNewList: FC<FormViewNewListProps> = ({
	methodOptions,
	contentTypeOptions,
	formState,
	onSubmit,
}) => {
	if (!formState) {
		return null;
	}

	return (
		<Formik
			initialValues={formState}
			onSubmit={onSubmit}
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
									id="method"
									name="query.viewType"
									label="Methode"
									options={methodOptions}
									as={Select}
								/>
								<div id="descMethod" className="u-text-light u-margin-top-xs">
									Selecteer hoe je de lijst wil opbouwen.
								</div>
							</div>
							{values?.query?.viewType === 'dynamic' ? (
								<div className="col-xs-12 col-md-6 u-margin-bottom">
									<Field
										aria-describedby="descContentType"
										id="contentType"
										name="query.contentType.uuid"
										loading={contentTypeOptions?.length === 0}
										label="Content type"
										options={contentTypeOptions}
										required={true}
										as={Select}
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

						<Button onClick={submitForm} outline>
							Wijzig
						</Button>
					</>
				);
			}}
		</Formik>
	);
};

export default FormViewNewList;
