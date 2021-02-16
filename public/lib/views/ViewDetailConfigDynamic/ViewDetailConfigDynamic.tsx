import { RenderChildRoutes, useNavigate, useSiteContext, useTenantContext } from '@redactie/utils';
import React, { FC, ReactElement, useEffect } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { NavList } from '../../components';
import DataLoader from '../../components/DataLoader/DataLoader';
import { useContentType, useViewDraft } from '../../hooks';
import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { MODULE_PATHS, SITES_ROOT } from '../../views.const';

import { VIEW_CC_NAV_LIST_ITEMS } from './ViewDetailConfigDynamic.const';
import { ViewDetailConfigDynamicProps } from './ViewDetailConfigDynamic.types';

const ViewConfigDynamic: FC<ViewDetailConfigDynamicProps> = ({ route }) => {
	/**
	 * Hooks
	 */
	const { viewUuid } = useParams<Record<string, string>>();
	const { tenantId } = useTenantContext();
	const { siteId } = useSiteContext();
	const { navigate } = useNavigate(SITES_ROOT);
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
				<div className="col-xs-12 col-md-9">
					<RenderChildRoutes
						routes={route.routes}
						extraOptions={{
							tenantId,
							view,
							contentType: activeContentType,
							onSubmit: onConfigChange,
						}}
					/>
				</div>
			</div>
		);
	};

	return (
		<DataLoader
			loadingState={contentTypeLoading}
			notFoundMessage={
				<span className="u-block u-text-center">Selecteer een content-type</span>
			}
			render={renderConfigSection}
		/>
	);
};

export default ViewConfigDynamic;
