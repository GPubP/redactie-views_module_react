import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, useEffect, useState } from 'react';

import DataLoader from '../../components/DataLoader/DataLoader';
import { useActiveTabs, useRoutesBreadcrumbs, useView } from '../../hooks';
import { ViewMetaSchema, ViewSchema } from '../../services/view';
import { VIEW_DETAIL_TAB_MAP, VIEW_DETAIL_TABS } from '../../views.const';
import { generateEmptyView } from '../../views.helpers';
import { LoadingState, Tab, ViewsRouteProps } from '../../views.types';

const ViewCreate: FC<ViewsRouteProps> = ({ location, tenantId, route }) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const breadcrumbs = useRoutesBreadcrumbs();
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);
	const [viewLoadingState, view, createView] = useView();

	useEffect(() => {
		if (viewLoadingState !== LoadingState.Loading) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [view, viewLoadingState]);

	/**
	 * Methods
	 */
	const upsertView = (sectionData: any, tab: Tab): void => {
		switch (tab.name) {
			case VIEW_DETAIL_TAB_MAP.settings.name:
				createView({
					...generateEmptyView(),
					meta: {
						...(sectionData as ViewMetaSchema),
					},
				} as ViewSchema);
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
			view: view || generateEmptyView(),
			onSubmit: (sectionData: any, tab: Tab) => upsertView(sectionData, tab),
		});
	};

	return (
		<>
			<ContextHeader tabs={activeTabs.slice(0, 1)} title="Content overzicht aanmaken">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<div className="u-margin-top">
				<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
			</div>
		</>
	);
};

export default ViewCreate;
