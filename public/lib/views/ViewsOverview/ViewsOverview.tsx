import { Button } from '@acpaas-ui/react-components';
import {
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import useRoutes from '../../hooks/useRoutes/useRoutes';
import { getViews, ViewSchema } from '../../services/views';
import { LoadingState } from '../../types';
import { BREADCRUMB_OPTIONS } from '../../views.const';
import { ViewsRouteProps } from '../../views.types';

const ViewsOverview: FC<ViewsRouteProps> = ({ tenantId, history }) => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [views, setViews] = useState<ViewSchema[] | null>(null);
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], BREADCRUMB_OPTIONS);

	useEffect(() => {
		getViews()
			.then(data => {
				if (data?.length) {
					setViews(data);
				}
				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, []);

	return (
		<>
			<ContextHeader title="Views">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				<ContextHeaderActionsSection>
					<Button
						iconLeft="plus"
						onClick={() => history.push(`/${tenantId}/content-types/aanmaken`)}
					>
						Nieuwe maken
					</Button>
				</ContextHeaderActionsSection>
			</ContextHeader>
		</>
	);
};

export default ViewsOverview;
