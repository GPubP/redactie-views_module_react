import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import { ContextHeaderBadge } from '@redactie/content-module/dist/lib/content.types';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { DataLoader, RenderChildRoutes } from '../../components';
import {
	useActiveTabs,
	useContentType,
	useNavigate,
	useRoutesBreadcrumbs,
	useView,
	useViewDraft,
} from '../../hooks';
import { ViewSchema } from '../../services/views';
import { contentTypesFacade } from '../../store/contentTypes';
import { viewsFacade } from '../../store/views';
import { ALERT_CONTAINER_IDS, MODULE_PATHS, VIEW_DETAIL_TABS } from '../../views.const';
import { LoadingState, Tab, ViewsRouteProps } from '../../views.types';

const ViewUpdate: FC<ViewsRouteProps<{ viewUuid?: string; siteId: string }>> = ({
	location,
	route,
	tenantId,
}) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const { siteId, viewUuid } = useParams<{ viewUuid?: string; siteId: string }>();
	const { generatePath } = useNavigate();
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Views',
			target: generatePath(MODULE_PATHS.overview, {
				siteId,
			}),
		},
	]);
	const [viewLoadingState, view, upsertViewLoadingState] = useView();
	const isLoading = useMemo(() => {
		return (
			viewLoadingState === LoadingState.Loading ||
			upsertViewLoadingState === LoadingState.Loading
		);
	}, [upsertViewLoadingState, viewLoadingState]);
	const [viewDraft] = useViewDraft();
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);
	const [, contentType] = useContentType();
	const badges: ContextHeaderBadge[] = useMemo(() => {
		if (viewDraft?.query?.viewType === 'dynamic' && contentType?.meta?.label) {
			return [
				{
					type: 'primary',
					name: contentType?.meta?.label,
				},
			];
		}

		if (viewDraft?.query?.viewType === 'static') {
			return [
				{
					type: 'primary',
					name: 'Manueel geselecteerd',
				},
			];
		}

		return [];
	}, [contentType, viewDraft]);

	useEffect(() => {
		if (viewLoadingState !== LoadingState.Loading) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [viewLoadingState]);

	useEffect(() => {
		if (viewLoadingState !== LoadingState.Loading && view) {
			viewsFacade.setViewDraft(view);
			view.query.contentType
				? contentTypesFacade.getContentType(siteId, view.query.contentType.uuid)
				: null;
		}
	}, [siteId, view, viewLoadingState]);

	useEffect(() => {
		if (viewUuid) {
			viewsFacade.getView(siteId, viewUuid);
		}

		return () => viewsFacade.unsetView();
	}, [siteId, viewUuid]);

	/**
	 * Methods
	 */
	const onCancel = (): void => {
		if (!view) {
			return;
		}

		viewsFacade.setViewDraft(view);
	};

	const update = (updatedView: ViewSchema, tab: Tab): void => {
		if (!updatedView) {
			return;
		}

		viewsFacade.updateView(
			siteId,
			updatedView,
			tab.target === 'instellingen'
				? ALERT_CONTAINER_IDS.settings
				: ALERT_CONTAINER_IDS.config
		);
	};
	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		if (!viewDraft) {
			return null;
		}

		return (
			<RenderChildRoutes
				routes={route.routes}
				guardsMeta={{
					tenantId,
				}}
				extraOptions={{
					onCancel,
					onSubmit: update,
					routes: route.routes,
					view,
					loading: isLoading,
				}}
			/>
		);
	};

	return (
		<>
			<ContextHeader
				tabs={activeTabs}
				linkProps={(props: any) => ({
					...props,
					to: generatePath(`${MODULE_PATHS.detail}/${props.href}`, { siteId, viewUuid }),
					component: Link,
				})}
				title="View bewerken"
				badges={badges}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
		</>
	);
};

export default ViewUpdate;
