import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import { RenderChildRoutes, useNavigate } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { DataLoader } from '../../components';
import { useActiveTabs, useRoutesBreadcrumbs, useView, useViewDraft } from '../../hooks';
import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';
import {
	ALERT_CONTAINER_IDS,
	MODULE_PATHS,
	SITES_ROOT,
	VIEW_DETAIL_TAB_MAP,
	VIEW_DETAIL_TABS,
} from '../../views.const';
import { generateEmptyView } from '../../views.helpers';
import { LoadingState, Tab, ViewsMatchProps, ViewsRouteProps } from '../../views.types';

const ViewCreate: FC<ViewsRouteProps<ViewsMatchProps>> = ({ location, tenantId, route, match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const { navigate, generatePath } = useNavigate(SITES_ROOT);
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Views',
			target: generatePath(MODULE_PATHS.overview, {
				siteId,
			}),
		},
	]);
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);
	const [viewLoadingState, view, upsertViewLoadingState] = useView();
	const [viewDraft] = useViewDraft();
	const isLoading = useMemo(() => {
		return (
			viewLoadingState === LoadingState.Loading ||
			upsertViewLoadingState === LoadingState.Loading
		);
	}, [upsertViewLoadingState, viewLoadingState]);

	useEffect(() => {
		if (viewLoadingState !== LoadingState.Loading) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [viewLoadingState]);

	useEffect(() => {
		if (view?.uuid) {
			navigate(`${MODULE_PATHS.detailConfigDynamic}`, { siteId, viewUuid: view.uuid });
		}
	}, [navigate, siteId, view]);

	useEffect(() => {
		if (!viewDraft) {
			viewsFacade.setView(generateEmptyView());
			viewsFacade.setViewDraft(generateEmptyView());
		}
	}, [viewDraft]);

	/**
	 * Methods
	 */
	const navigateToOverview = (): void => {
		navigate(`${MODULE_PATHS.root}`, { siteId });
	};

	const upsertView = (
		sectionData: any,
		tab: Tab,
		alertId = ALERT_CONTAINER_IDS.settings
	): void => {
		switch (tab.name) {
			case VIEW_DETAIL_TAB_MAP.settings.name:
				viewsFacade.createView(
					siteId,
					{
						...generateEmptyView(),
						meta: {
							...sectionData?.meta,
						},
					} as ViewSchema,
					alertId
				);
				break;
		}
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement => (
		<RenderChildRoutes
			routes={route.routes}
			extraOptions={{
				tenantId,
				routes: route.routes,
				view: view || generateEmptyView(),
				loading: isLoading,
				onCancel: navigateToOverview,
				onSubmit: (sectionData: any, tab: Tab) => upsertView(sectionData, tab),
			}}
		/>
	);

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
