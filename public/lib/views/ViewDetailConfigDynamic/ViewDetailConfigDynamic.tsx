import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { NavList } from '../../components';
import DataLoader from '../../components/DataLoader/DataLoader';
import TenantContext from '../../context/TenantContext/TenantContext';
import { useContentType, useViewDraft } from '../../hooks';
import useNavigate from '../../hooks/useNavigate/useNavigate';
import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { MODULE_PATHS } from '../../views.const';

import { VIEW_CC_NAV_LIST_ITEMS } from './viewDetailConfigDynamic.const';
import { ViewDetailConfigDynamicProps } from './viewDetailConfigDynamic.types';

const ViewConfigDynamic: FC<ViewDetailConfigDynamicProps> = ({ route }) => {
	/**
	 * Hooks
	 */
	const { viewUuid } = useParams<Record<string, string>>();
	const { siteId, tenantId } = useContext(TenantContext);
	const { navigate } = useNavigate();
	const [contentTypeLoading, activeContentType] = useContentType();
	const [view] = useViewDraft();

	useEffect(() => {
		if (view?.query.viewType === 'static') {
			navigate(MODULE_PATHS.detailConfigStatic, { siteId, tenantId, viewUuid });
		}
	}, [navigate, siteId, tenantId, view, viewUuid]);

	/**
	 * Functions
	 */
	const onConfigChange = (updatedView: ViewSchema): void => {
		viewsFacade.setViewDraft(updatedView);
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			tenantId,
			view,
			contentType: activeContentType,
			onSubmit: onConfigChange,
		});
	};

	const renderConfigSection = (): ReactElement | null => {
		if (!view?.query?.contentType || !activeContentType) {
			return null;
		}

		return (
			<div className="row between-xs top-xs u-margin-bottom-lg">
				<div className="col-xs-12 col-md-3 u-margin-bottom">
					<NavList
						items={VIEW_CC_NAV_LIST_ITEMS.map(listItem => ({
							...listItem,
							to: generatePath(`${route.path}/${listItem.to}`, {
								siteId,
								viewUuid,
							}),
						}))}
					/>
				</div>
				<div className="col-xs-12 col-md-9">{renderChildRoutes()}</div>
			</div>
		);
	};

	return <DataLoader loadingState={contentTypeLoading} render={renderConfigSection} />;
};

export default ViewConfigDynamic;
