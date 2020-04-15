import { Table } from '@acpaas-ui/react-editorial-components';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement } from 'react';

import { FIELD_COLUMNS } from './FormViewConditions.conts';
import { FormViewConditionsProps } from './FormViewConditions.types';

const FormViewConditions: FC<FormViewConditionsProps> = ({ formState, onSubmit }) => {
	const renderTableField = (): ReactElement => {
		return (
			<Table
				className="u-margin-top"
				columns={FIELD_COLUMNS}
				rows={formState.query.conditions}
			></Table>
		);
	};

	return (
		<Formik initialValues={formState} onSubmit={onSubmit}>
			{() => <Field name="fields" placeholder="No fields" as={renderTableField} />}
		</Formik>
	);
};

export default FormViewConditions;
