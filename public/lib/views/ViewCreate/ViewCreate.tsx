import { ContextHeader, ContextHeaderTopSection } from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DataLoader from '../../components/DataLoader/DataLoader';
import { useActiveTabs, useNavigate, useRoutes } from '../../hooks';
import { MODULE_PATHS, VIEW_DETAIL_TABS } from '../../views.const';
import { generateEmptyView } from '../../views.helpers';
import { LoadingState, Tab, ViewsRouteProps } from '../../views.types';

const ViewCreate: FC<ViewsRouteProps> = ({ location, routes, tenantId }) => {
	/**
	 * Hooks
	 */
	const [initialLoading] = useState(LoadingState.Loaded);
	const breadcrumbs = useRoutes();
	const activeTabs = useActiveTabs(VIEW_DETAIL_TABS, location.pathname);
	const { generatePath } = useNavigate();

	/**
	 * Render
	 */
	const renderChildRoutes = (): any => {
		const activeRoute =
			routes.find(item => item.path === generatePath(MODULE_PATHS.create)) || null;

		console.log(activeRoute);
	};

	return (
		<>
			<ContextHeader
				tabs={activeTabs.slice(0, 1)}
				linkProps={(props: any) => ({
					...props,
					to: props.href,
					component: Link,
				})}
				title="Content overzicht aanmaken"
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
