import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { DataLoader } from '../../components';
import { useActiveTabs, useNavigate, useRoutesBreadcrumbs, useView } from '../../hooks';
import { ViewSchema } from '../../services/view';
import { MODULE_PATHS, VIEW_DETAIL_TAB_MAP, VIEW_DETAIL_TABS } from '../../views.const';
import { generateEmptyView } from '../../views.helpers';
import { LoadingState, Tab, ViewsMatchProps, ViewsRouteProps } from '../../views.types';

const ViewCreate: FC<ViewsRouteProps<ViewsMatchProps>> = ({ location, tenantId, route, match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const { navigate, generatePath } = useNavigate();
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Views',
			target: generatePath(MODULE_PATHS.overview, {
				siteId,
			}),
		},
	]);
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);
	const [viewLoadingState, view, , createView] = useView(siteId);

	useEffect(() => {
		if (view) {
			navigate(`${MODULE_PATHS.detailConfig}`, { siteId, viewUuid: view.uuid });
		}
		if (viewLoadingState !== LoadingState.Loading) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [navigate, siteId, view, viewLoadingState]);

	/**
	 * Methods
	 */
	const navigateToOverview = (): void => {
		navigate(`${MODULE_PATHS.root}`, { siteId });
	};

	const upsertView = (sectionData: any, tab: Tab): void => {
		switch (tab.name) {
			case VIEW_DETAIL_TAB_MAP.settings.name:
				createView({
					...generateEmptyView(),
					meta: {
						...sectionData?.meta,
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
			loading: viewLoadingState === LoadingState.Creating,
			onCancel: navigateToOverview,
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
