import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, useState } from 'react';

import DataLoader from '../../components/DataLoader/DataLoader';
import { useActiveTabs, useRoutesBreadcrumbs } from '../../hooks';
import { VIEW_DETAIL_TAB_MAP, VIEW_DETAIL_TABS } from '../../views.const';
import { generateEmptyView } from '../../views.helpers';
import { LoadingState, Tab, ViewsRouteProps } from '../../views.types';

const ViewCreate: FC<ViewsRouteProps> = ({ location, tenantId, route }) => {
	/**
	 * Hooks
	 */
	const [initialLoading] = useState(LoadingState.Loaded);
	const breadcrumbs = useRoutesBreadcrumbs();
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);

	/**
	 * Methods
	 */
	const upsertCT = (sectionData: any, tab: Tab): void => {
		switch (tab.name) {
			case VIEW_DETAIL_TAB_MAP.settings.name:
				console.log(VIEW_DETAIL_TAB_MAP.settings.name, sectionData);
				break;
			case VIEW_DETAIL_TAB_MAP.config.name:
				console.log(VIEW_DETAIL_TAB_MAP.config.name, sectionData);
				break;
		}
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): any => {
		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			tenantId,
			routes: route.routes,
			view: generateEmptyView(),
			onSubmit: (sectionData: any, tab: Tab) => upsertCT(sectionData, tab),
		});
	};

	return (
		<>
			<ContextHeader tabs={activeTabs} title="Content overzicht aanmaken">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<div className="u-margin-top">
				<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
			</div>
		</>
	);
};

export default ViewCreate;
