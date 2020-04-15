import { Button } from '@acpaas-ui/react-components';
import {
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import useRoutes from '../../hooks/useRoutes/useRoutes';
import { BREADCRUMB_OPTIONS } from '../../views.const';
import { ViewsRouteProps } from '../../views.types';

const ViewsOverview: FC<ViewsRouteProps> = ({ tenantId, history }) => {
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], BREADCRUMB_OPTIONS);

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
