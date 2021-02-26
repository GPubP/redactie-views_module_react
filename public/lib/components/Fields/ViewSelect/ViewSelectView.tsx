import { ViewFieldProps } from '@redactie/form-renderer-module';
import { useNavigate, useSiteContext, useTenantContext } from '@redactie/utils';
import React, { ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './ViewSelect.scss';

import { useCcViewItem } from '../../../hooks';
import { ccViewsFacade } from '../../../store/ccViews';
import { MODULE_PATHS, SITES_ROOT } from '../../../views.const';
import DataLoader from '../../DataLoader/DataLoader';

const ViewSelectView: React.FC<ViewFieldProps> = ({ value, fieldSchema }) => {
	const { siteId } = useSiteContext();
	const { tenantId } = useTenantContext();
	const { generatePath } = useNavigate(SITES_ROOT);
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
					<span className="fa fa-chevron-right" />
					{ccViewItem?.meta.label}
				</Link>
			</div>
		);
	};

	return (
		<DataLoader loadingState={contentItemLoadingState} render={renderView} notFoundMessage="" />
	);
};

export default ViewSelectView;
