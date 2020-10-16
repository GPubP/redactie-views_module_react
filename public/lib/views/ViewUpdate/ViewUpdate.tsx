import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import { ContextHeaderBadge } from '@redactie/content-module/dist/lib/content.types';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';

import { DataLoader, RenderChildRoutes } from '../../components';
import { useActiveTabs, useNavigate, useRoutesBreadcrumbs, useView } from '../../hooks';
import { ContentTypeSchema } from '../../services/contentTypes/contentTypes.service.types';
import { ViewSchema } from '../../services/views';
import { internalService, useViewFacade } from '../../store/views';
import { MODULE_PATHS, VIEW_DETAIL_TABS } from '../../views.const';
import { LoadingState, ViewsRouteProps } from '../../views.types';

const ViewUpdate: FC<ViewsRouteProps<{ viewUuid?: string; siteId: string }>> = ({
	location,
	route,
	match,
	tenantId,
}) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);

	const { siteId, viewUuid } = useParams<{ viewUuid?: string; siteId: string }>();
	const { navigate, generatePath } = useNavigate();
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Views',
			target: generatePath(MODULE_PATHS.overview, {
				siteId,
			}),
		},
	]);
	const [viewLoadingState, view, updateView] = useView(siteId || '', viewUuid);
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);
	const internalView = useViewFacade();
	const badges: ContextHeaderBadge[] = useMemo(() => {
		if ((view?.query?.contentType as ContentTypeSchema)?.meta?.label) {
			return [
				{
					type: 'primary',
					name: (view?.query?.contentType as ContentTypeSchema)?.meta?.label,
				},
			];
		}

		return [];
	}, [view]);

	useEffect(() => {
		if (viewLoadingState !== LoadingState.Loading) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [viewLoadingState]);

	useEffect(() => {
		if (viewLoadingState !== LoadingState.Loading && view) {
			internalService.updateView(view);
		}
	}, [view, viewLoadingState]);

	/**
	 * Methods
	 */
	const navigateToOverview = (): void => {
		navigate(`${MODULE_PATHS.root}`, { siteId });
	};

	const update = (updatedView: ViewSchema): void => {
		if (!updatedView) {
			return;
		}

		// TODO: fix with store integration
		updateView(updatedView);
	};
	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		if (!internalView) {
			return null;
		}

		const uuidRegex =
			'\\b[0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12}\\b';

		// Redirect /views/:viewUuid/configuratie to /views/:viewUuid/instellingen/configuratie/voorwaarden
		if (new RegExp(`/views/${uuidRegex}/configuratie$`).test(location.pathname)) {
			return <Redirect to={`${match.url}/configuratie/voorwaarden`} />;
		}

		return (
			<RenderChildRoutes
				routes={route.routes}
				guardsMeta={{
					tenantId,
				}}
				extraOptions={{
					onCancel: navigateToOverview,
					onSubmit: update,
					routes: route.routes,
					view: internalView,
					loading: viewLoadingState === LoadingState.Updating,
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
			<div className="u-margin-top">
				<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
			</div>
		</>
	);
};

export default ViewUpdate;
