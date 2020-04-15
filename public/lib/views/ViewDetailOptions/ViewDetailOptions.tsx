import { Card } from '@acpaas-ui/react-components';
import React, { FC } from 'react';

import { FormViewOptions } from '../../components';

import { DUMMY_ORDER_OPTIONS, DUMMY_SORT_OPTIONS } from './ViewDetailOptions.const';
import { ViewDetailOptionsProps } from './ViewDetailOptions.types';

const ViewDetailOptions: FC<ViewDetailOptionsProps> = ({ view, onSubmit }) => {
	/**
	 * Render
	 */
	return (
		<Card>
			<div className="u-margin">
				<h5>Sorteer-opties</h5>

				<FormViewOptions
					sortOptions={DUMMY_SORT_OPTIONS}
					orderOptions={DUMMY_ORDER_OPTIONS}
					formState={view}
					onSubmit={onSubmit}
				/>
			</div>
		</Card>
	);
};

export default ViewDetailOptions;
