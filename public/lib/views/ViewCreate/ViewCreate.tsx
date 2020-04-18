import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { DataLoader } from '../../components';
import { useActiveTabs, useNavigate, useRoutesBreadcrumbs, useView } from '../../hooks';
import { ViewMetaSchema, ViewSchema } from '../../services/view';
import { MODULE_PATHS, VIEW_DETAIL_TAB_MAP, VIEW_DETAIL_TABS } from '../../views.const';
import { generateEmptyView } from '../../views.helpers';
import { LoadingState, Tab, ViewsMatchProps, ViewsRouteProps } from '../../views.types';

const ViewCreate: FC<ViewsRouteProps<ViewsMatchProps>> = ({ location, tenantId, route, match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const breadcrumbs = useRoutesBreadcrumbs();
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);
	const [viewLoadingState, view, , createView] = useView();
	const { navigate } = useNavigate();

	useEffect(() => {
		if (view) {
			navigate(`/sites${MODULE_PATHS.detailConfig}`, { siteId, viewUuid: view.uuid });
		}
		if (viewLoadingState !== LoadingState.Loading) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [navigate, siteId, view, viewLoadingState]);

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
			<ContextHeader
				tabs={activeTabs.slice(0, 1)}
				linkProps={(props: any) => ({
					...props,
					to: generatePath(`${route.path}/${props.href}`, { siteId }),
					component: Link,
				})}
				title="View aanmaken"
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<div className="u-margin-top">
				<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
			</div>
		</>
	);
};

export default ViewCreate;
