import { Button, Select } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { FC } from 'react';

import { FormViewNewCCProps } from './FormViewNewCC.types';

const FormGeneralCC: FC<FormViewNewCCProps> = ({
	methodOptions,
	contentTypeOptions,
	formState,
	onSubmit,
}) => {
	return (
		<Formik initialValues={formState} onSubmit={onSubmit}>
			{({ submitForm, values }) => (
				<>
					<div className="row u-margin-top u-margin-bottom">
						<div className="col-xs-6">
							<Field
								label="Methode"
								name="method"
								options={methodOptions}
								as={Select}
							/>
							<div className="u-text-light u-margin-top-xs">
								Selecteer hoe je de lijst wil opbouwen.
							</div>
						</div>
						<div className="col-xs-6">
							<Field
								label="Content type"
								name="contentType"
								options={contentTypeOptions}
								as={Select}
							/>
							<div className="u-text-light u-margin-top-xs">
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

export default FormGeneralCC;
