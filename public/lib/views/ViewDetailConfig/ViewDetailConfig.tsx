import { Button, Card } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import React, { FC } from 'react';

import { FormViewConditions, FormViewNewList, FormViewOptions, NavList } from '../../components';

import {
	DUMMY_CONTENTTYPE_OPTIONS,
	DUMMY_METHOD_OPTIONS,
	DUMMY_ORDER_OPTIONS,
	DUMMY_SORT_OPTIONS,
	VIEW_CC_NAV_LIST_ITEMS,
} from './ViewDetailConfig.const';
import { ViewDetailConfigProps } from './ViewDetailConfig.types';

const ViewConfig: FC<ViewDetailConfigProps> = ({ view }) => {
	/**
	 * Render
	 */
	return (
		<>
			<div className="u-container u-wrapper">
				<div className="row between-xs top-xs u-margin-bottom-lg">
					<div className="col-xs-12 u-margin-bottom">
						<Card>
							<div className="u-margin">
								<FormViewNewList
									contentTypeOptions={DUMMY_CONTENTTYPE_OPTIONS}
									methodOptions={DUMMY_METHOD_OPTIONS}
									formState={view}
									onSubmit={() => {
										console.log('submit filter form');
									}}
								/>
							</div>
						</Card>
					</div>
					<div className="col-xs-3">
						<Card>
							<NavList items={VIEW_CC_NAV_LIST_ITEMS} />
						</Card>
					</div>
					<div className="col-xs-9">
						<Card>
							<div className="u-margin">
								<h5>Voorwaarden</h5>

								<FormViewConditions
									formState={view}
									onSubmit={() => {
										console.log('submit conditions form');
									}}
								/>
							</div>
						</Card>
						<Card>
							<div className="u-margin">
								<h5>Sorteer-opties</h5>

								<FormViewOptions
									sortOptions={DUMMY_SORT_OPTIONS}
									orderOptions={DUMMY_ORDER_OPTIONS}
									formState={view}
									onSubmit={() => {
										console.log('submit options form');
									}}
								/>
							</div>
						</Card>
					</div>
				</div>
			</div>
			<ActionBar show>
				<ActionBarContentSection>
					<div className="u-wrapper">
						<Button className="u-margin-right" type="success">
							Bewaar
						</Button>
						<Button outline>Annuleer</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
		</>
	);
};

export default ViewConfig;
