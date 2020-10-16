import { Select, TextField } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { FC } from 'react';

import AutoSubmit from '../AutoSubmit/AutoSubmit';

import { FormViewOptionsProps } from './FormViewOptions.types';

const FormViewOptions: FC<FormViewOptionsProps> = ({
	sortOptions,
	orderOptions,
	formState,
	onSubmit,
}) => {
	return (
		<Formik initialValues={formState} onSubmit={onSubmit} enableReinitialize>
			{() => (
				<>
					<AutoSubmit />
					<div className="row u-margin-top u-margin-bottom">
						<div className="col-xs-6">
							<Field
								id="orderBy"
								name="orderBy"
								label="Sorteer op"
								options={sortOptions}
								as={Select}
							/>
						</div>
						<div className="col-xs-6">
							<Field
								id="order"
								name="order"
								label="Volgorde"
								options={orderOptions}
								as={Select}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-3">
							<Field
								as={TextField}
								type="number"
								id="offset"
								name="offset"
								label="Aantal items overslaan"
							/>
						</div>
						<div className="col-xs-3">
							<Field
								as={TextField}
								type="number"
								id="limit"
								name="limit"
								label="Beperkt tot"
							/>
						</div>
					</div>
				</>
			)}
		</Formik>
	);
};

export default FormViewOptions;
