import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';

import DataLoader from '../../components/DataLoader/DataLoader';
import { useActiveTabs, useNavigate, useRoutesBreadcrumbs, useView } from '../../hooks';
import { ViewSchema } from '../../services/view';
import { internalService } from '../../store/internal';
import { MODULE_PATHS, VIEW_DETAIL_TABS } from '../../views.const';
import { LoadingState, ViewsMatchProps, ViewsRouteProps } from '../../views.types';

const ViewUpdate: FC<ViewsRouteProps> = ({ location, routes, route, tenantId, match }) => {
	/**
	 * Hooks
	 */
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const { siteId, viewUuid } = useParams();
	const breadcrumbs = useRoutesBreadcrumbs();
	const [viewLoadingState, view, updateView] = useView(viewUuid);
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);
	const { navigate } = useNavigate();

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
		navigate(MODULE_PATHS.root);
	};

	const update = (view: ViewSchema): void => {
		if (!view) {
			return;
		}

		// TODO: fix with store integration
		updateView(view);
	};
	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		if (!view) {
			return null;
		}

		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			onCancel: navigateToOverview,
			onSubmit: update,
			routes: route.routes,
			view: view,
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
