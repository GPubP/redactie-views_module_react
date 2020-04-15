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
								label="Sorteer op"
								name="query.options.orderBy"
								options={sortOptions}
								as={Select}
							/>
						</div>
						<div className="col-xs-6">
							<Field
								label="Volgorde"
								name="query.options.order"
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
