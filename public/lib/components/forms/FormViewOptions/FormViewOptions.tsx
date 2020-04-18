import { Select } from '@acpaas-ui/react-components';
import { Field, Formik } from 'formik';
import React, { FC } from 'react';

import { FormViewOptionsProps } from './FormViewOptions.types';

const FormViewOptions: FC<FormViewOptionsProps> = ({
	sortOptions,
	orderOptions,
	formState,
	onSubmit,
}) => {
	return (
		<Formik initialValues={formState} onSubmit={onSubmit}>
			{() => (
				<>
					<div className="row u-margin-top u-margin-bottom">
						<div className="col-xs-6">
							<Field
								id="query.options.orderBy"
								name="query.options.orderBy"
								label="Sorteer op"
								options={sortOptions}
								as={Select}
							/>
						</div>
						<div className="col-xs-6">
							<Field
								id="query.options.order"
								name="query.options.order"
								label="Volgorde"
								options={orderOptions}
								as={Select}
							/>
						</div>
						{/* TODO: add offset and limit selectors */}
					</div>
				</>
			)}
		</Formik>
	);
};

export default FormViewOptions;
