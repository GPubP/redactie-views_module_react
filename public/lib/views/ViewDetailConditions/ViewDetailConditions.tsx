import { Card } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import { FormViewConditions } from '../../components';

import { ViewDetailConditionsProps } from './ViewDetailConditions.types';

const ViewDetailConditions: FC<ViewDetailConditionsProps> = ({ view, onSubmit }) => {
	/**
	 * Render
	 */
	return (
		<Card>
			<div className="u-margin">
				<h5>Voorwaarden</h5>

				<FormViewConditions formState={view} onSubmit={onSubmit} />
			</div>
		</Card>
	);
};

export default ViewDetailConditions;
