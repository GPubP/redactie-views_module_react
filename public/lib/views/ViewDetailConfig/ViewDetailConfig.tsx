import { Button, Card } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, ReactElement } from 'react';
import { generatePath } from 'react-router-dom';

import { FormViewNewList, NavList } from '../../components';
import { VIEW_DETAIL_TAB_MAP } from '../../views.const';

import {
	DUMMY_CONTENTTYPE_OPTIONS,
	DUMMY_METHOD_OPTIONS,
	VIEW_CC_NAV_LIST_ITEMS,
} from './ViewDetailConfig.const';
import { ViewDetailConfigMatchProps, ViewDetailConfigProps } from './ViewDetailConfig.types';

const ViewConfig: FC<ViewDetailConfigProps<ViewDetailConfigMatchProps>> = ({
	view,
	route,
	tenantId,
	onSubmit,
	match,
}) => {
	const { siteId } = match.params;

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			tenantId,
			view: view,
			onSubmit: () => onSubmit({ view }, VIEW_DETAIL_TAB_MAP.configuratie),
		});
	};

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
							<NavList
								items={VIEW_CC_NAV_LIST_ITEMS.map(listItem => ({
									...listItem,
									to: generatePath(`${route.path}/${listItem.to}`, { siteId }),
								}))}
							/>
						</Card>
					</div>
					<div className="col-xs-9">{renderChildRoutes()}</div>
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
