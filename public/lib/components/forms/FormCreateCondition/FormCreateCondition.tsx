import { Button, Select, TextField } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { FC, useMemo } from 'react';

import { DEFAULT_OPERATORS } from './FormCreateCondition.const';
import { FormCreateConditionProps } from './FormCreateCondition.types';

const FormCreateCondition: FC<FormCreateConditionProps> = ({ onSubmit, fields }) => {
	const initialValues = useMemo(
		() => ({
			field: fields && fields.length > 0 ? fields[0].key : '',
			operator: DEFAULT_OPERATORS[0].value,
			value: '',
		}),
		[fields]
	);

	return (
		<Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit}>
			{({ submitForm }) => (
				<div className="u-margin-top">
					<div className="row">
						<div className="col-xs-12 col-sm-6">
							<Field
								id="field"
								name="field"
								label="Veld"
								loading={fields.length === 0}
								options={fields}
								as={Select}
							/>
						</div>
						<div className="col-xs-12 col-sm-6">
							<Field
								id="operator"
								name="operator"
								label="Operator"
								options={DEFAULT_OPERATORS}
								as={Select}
							/>
						</div>
					</div>
					<div className="row u-margin-top u-margin-bottom">
						<div className="col-xs-12">
							<Field
								id="value"
								name="value"
								label="Waarde"
								placeholder="Geef een waarde op"
								as={TextField}
							/>
						</div>
					</div>
					<Button onClick={submitForm} outline>
						Voeg toe
					</Button>
				</div>
			)}
		</Formik>
	);
};

export default FormCreateCondition;
