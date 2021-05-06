import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import {
	ContextHeaderTab,
	ContextHeaderTabLinkProps,
	DataLoader,
	LoadingState,
	RenderChildRoutes,
	useNavigate,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import rolesRightsConnector from '../../connectors/rolesRights';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useActiveTabs, useRoutesBreadcrumbs, useView, useViewDraft } from '../../hooks';
import { ViewSchema } from '../../services/views';
import { contentTypesFacade } from '../../store/contentTypes';
import { viewsFacade } from '../../store/views';
import { ALERT_CONTAINER_IDS, MODULE_PATHS, SITES_ROOT, VIEW_DETAIL_TABS } from '../../views.const';
import { ViewsRouteProps } from '../../views.types';

import { DEFAULT_HEADER_BADGES } from './ViewUpdate.const';

const ViewUpdate: FC<ViewsRouteProps<{ viewUuid?: string; siteId: string }>> = ({
	location,
	route,
	tenantId,
}) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [t] = useCoreTranslation();
	const { siteId, viewUuid } = useParams<{ viewUuid?: string; siteId: string }>();
	const { generatePath } = useNavigate(SITES_ROOT);
	const breadcrumbs = useRoutesBreadcrumbs([
		{
			name: 'Views',
			target: generatePath(MODULE_PATHS.overview, {
				siteId,
			}),
		},
	]);
	const [viewLoadingState, view, upsertViewLoadingState] = useView();
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const rights = useMemo(
		() => ({
			canUpdate: rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityrights, [
				rolesRightsConnector.securityRights.update,
			]),
		}),
		[mySecurityrights]
	);
	const isLoading = useMemo(() => {
		return (
			viewLoadingState === LoadingState.Loading ||
			upsertViewLoadingState === LoadingState.Loading
		);
	}, [upsertViewLoadingState, viewLoadingState]);
	const [viewDraft] = useViewDraft();
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);

	useEffect(() => {
		if (
			viewLoadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			return setInitialLoading(LoadingState.Loaded);
		}

		setInitialLoading(LoadingState.Loading);
	}, [mySecurityRightsLoadingState, viewLoadingState]);

	useEffect(() => {
		if (viewLoadingState !== LoadingState.Loading && view) {
			viewsFacade.setViewDraft(view);
			view.query.contentType
				? contentTypesFacade.getContentType(siteId, view.query.contentType.uuid)
				: null;
		}

		return () => {
			// Clear previous (current) content type because there is a chance that we show
			// a content content type while the user has not even select one from the dropdown list
			// TODO: Refactor the store so we can get multiple content type details and store them locally
			contentTypesFacade.clearContentType();
		};
	}, [siteId, view, viewLoadingState]);

	useEffect(() => {
		if (viewUuid) {
			viewsFacade.getView(siteId, viewUuid);
		}

		return () => {
			viewsFacade.unsetView();
			viewsFacade.unsetViewDraft();
		};
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

	const update = (updatedView: ViewSchema, tab: ContextHeaderTab): void => {
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

	const pageTitle = `${viewDraft?.meta?.label ? `'${viewDraft?.meta?.label}'` : 'View'} ${t(
		CORE_TRANSLATIONS.ROUTING_UPDATE
	)}`;

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
					loading: isLoading,
					rights,
				}}
			/>
		);
	};

	return (
		<>
			<ContextHeader
				tabs={activeTabs}
				linkProps={(props: ContextHeaderTabLinkProps) => ({
					...props,
					to: generatePath(`${MODULE_PATHS.detail}/${props.href}`, { siteId, viewUuid }),
					component: Link,
				})}
				title={pageTitle}
				badges={DEFAULT_HEADER_BADGES}
			>
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
			</ContextHeader>
			<DataLoader loadingState={initialLoading} render={renderChildRoutes} />
		</>
	);
};

export default ViewUpdate;
