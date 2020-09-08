import { ViewFieldProps } from '@redactie/form-renderer-module';
import React, { ReactElement, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './ViewSelect.scss';

import contentConnector from '../../../connectors/content';
import { useCcViewItem, useNavigate } from '../../../hooks';
import { ccViewsFacade } from '../../../store/ccViews';
import { MODULE_PATHS } from '../../../views.const';
import DataLoader from '../../DataLoader/DataLoader';

const ViewSelectView: React.FC<ViewFieldProps> = ({ value, fieldSchema }: ViewFieldProps) => {
	// This will be rendered on the content page so this context its needed.
	const { siteId, tenantId } = useContext((contentConnector.api as any).contentTenantContext);
	const { generatePath } = useNavigate();
	const [contentItemLoadingState, ccViewItem] = useCcViewItem(value);

	useEffect(() => {
		if (!value) {
			return;
		}
		ccViewsFacade.getView(siteId, value);
	}, [siteId, value]);

	if (!value || typeof value !== 'string') {
		return null;
	}

	const renderView = (): ReactElement | null => {
		if (!ccViewItem) {
			return null;
		}

		return (
			<div className="u-margin-bottom">
				<Link
					id={`${fieldSchema?.name}-${value}`}
					className="a-button a-button-primary has-icon-right"
					title={ccViewItem?.meta.label}
					to={generatePath(MODULE_PATHS.detail, {
						viewUuid: ccViewItem?.uuid,
						siteId,
						tenantId,
					})}
				>
					<span className="fa fa-chevron-right"></span>
					{ccViewItem?.meta.label}
				</Link>
			</div>
		);
	};

	return (
		<DataLoader
			loadingState={contentItemLoadingState}
			render={renderView}
			notFoundMessage=""
		></DataLoader>
	);
};

export default ViewSelectView;
