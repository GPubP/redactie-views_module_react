import { Button, Select } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { FC } from 'react';

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
		<Formik initialValues={formState} onSubmit={onSubmit}>
			{({ submitForm, values }) => (
				<>
					<div className="row u-margin-top u-margin-bottom">
						<div className="col-xs-6">
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
							<div className="col-xs-6">
								<Field
									aria-describedby="descContentType"
									id="contentType"
									name="query.contentType.uuid"
									loading={contentTypeOptions?.length === 0}
									label="Content type"
									options={contentTypeOptions}
									as={Select}
								/>
								<div id="descContentType" className="u-text-light u-margin-top-xs">
									Selecteer van welk content type je een lijst wil maken.
								</div>
							</div>
						) : null}
					</div>

					<Button onClick={submitForm} outline>
						Wijzigen
					</Button>
				</>
			)}
		</Formik>
	);
};

export default FormViewNewList;
