import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';

import DataLoader from '../../components/DataLoader/DataLoader';
import { useActiveTabs, useNavigate, useRoutesBreadcrumbs, useView } from '../../hooks';
import { ViewSchema } from '../../services/view';
import { internalService, useViewFacade } from '../../store/internal';
import { MODULE_PATHS, VIEW_DETAIL_TABS } from '../../views.const';
import { LoadingState, ViewsRouteProps } from '../../views.types';

const ViewUpdate: FC<ViewsRouteProps> = ({ location, route }) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);

	const { siteId, viewUuid } = useParams();
	const breadcrumbs = useRoutesBreadcrumbs();
	const [viewLoadingState, view, updateView] = useView(viewUuid);
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);
	const { navigate } = useNavigate();
	const internalView = useViewFacade();

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
		navigate(`/sites${MODULE_PATHS.root}`, { siteId });
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

		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			onCancel: navigateToOverview,
			onSubmit: update,
			routes: route.routes,
			view: internalView,
		});
	};

	return (
		<>
			<ContextHeader
				tabs={activeTabs}
				linkProps={(props: any) => ({
					...props,
					to: generatePath(`${route.path}/${props.href}`, { siteId, viewUuid }),
					component: Link,
				})}
				title="View bewerken"
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
