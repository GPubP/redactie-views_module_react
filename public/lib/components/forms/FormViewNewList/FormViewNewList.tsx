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
	return (
		<Formik initialValues={formState} onSubmit={onSubmit}>
			{({ submitForm }) => (
				<>
					<div className="row u-margin-top u-margin-bottom">
						<div className="col-xs-6">
							<Field
								aria-describedby="descMethod"
								id="method"
								name="method"
								label="Methode"
								options={methodOptions}
								as={Select}
							/>
							<div id="descMethod" className="u-text-light u-margin-top-xs">
								Selecteer hoe je de lijst wil opbouwen.
							</div>
						</div>
						<div className="col-xs-6">
							<Field
								aria-describedby="descContentType"
								id="contentType"
								name="contentType"
								label="Content type"
								options={contentTypeOptions}
								as={Select}
							/>
							<div id="descContentType" className="u-text-light u-margin-top-xs">
								Selecteer van welk content type je een lijst wil maken.
							</div>
						</div>
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
