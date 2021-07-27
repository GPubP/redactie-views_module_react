import { Button } from '@acpaas-ui/react-components';
import { Container, PaginatedTable } from '@acpaas-ui/react-editorial-components';
import { DataLoader, LoadingState, useAPIQueryParams, useNavigate } from '@redactie/utils';
import moment from 'moment';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useView } from '../../hooks';
import useViewPreview from '../../hooks/useViewPreview/useViewPreview';
import { DEFAULT_SEARCH_PARAMS } from '../../services/api';
import { ViewsSearchParams } from '../../services/views';
import { viewPreviewFacade } from '../../store/viewPreview';
import { CONTENT_DETAIL_PATH, SITES_ROOT } from '../../views.const';
import { ViewsMatchProps, ViewsRouteProps } from '../../views.types';

import { PREVIEW_QUERY_PARAMS_CONFIG, VIEWS_PREVIEW_COLUMNS } from './ViewDetailPreview.const';
import { ViewDetailPreviewTableRow } from './ViewDetailPreview.types';

const ViewDetailPreview: FC<ViewsRouteProps<ViewsMatchProps>> = ({ match }) => {
	const { siteId, viewUuid } = match.params;
	/**
	 * Hooks
	 */

	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [query, setQuery] = useAPIQueryParams(PREVIEW_QUERY_PARAMS_CONFIG, false);
	const { navigate } = useNavigate(SITES_ROOT);
	const [t] = useCoreTranslation();
	const [loadingState, viewPreview, viewPreviewPaging] = useViewPreview();
	const [, view] = useView();

	useEffect(() => {
		if (loadingState === LoadingState.Loaded) {
			return setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState]);

	useEffect(
		() =>
			viewPreviewFacade.getViewPreview(
				siteId,
				viewUuid as string,
				query as ViewsSearchParams
			),
		[query, siteId, viewUuid]
	);

	/**
	 * Functions
	 */

	const handlePageChange = (pageNumber: number): void => {
		setQuery({
			page: pageNumber,
			pagesize: 10,
		});
	};

	/**
	 * Render
	 */
	if (!Array.isArray(viewPreview)) {
		return null;
	}

	const viewPreviewRows: ViewDetailPreviewTableRow[] = viewPreview.map(content => ({
		uuid: content.uuid as string,
		label: content.meta.label,
		author:
			content.meta.lastEditor?.firstname || content.meta.lastEditor?.lastname
				? `${content.meta.lastEditor?.firstname || ''} ${content.meta.lastEditor
						?.lastname || ''}`
				: 'Onbekend',
		lastModified: moment(content.meta.lastModified).format('DD/MM/YYYY'),
		navigate: (contentUuid: string) => navigate(CONTENT_DETAIL_PATH, { siteId, contentUuid }),
	}));

	const renderTable = (): ReactElement => {
		return (
			<Container>
				<h6 className="u-margin-top u-margin-bottom">
					{view?.meta.label} ({viewPreviewPaging?.totalElements || 0})
				</h6>
				<Button
					onClick={() =>
						viewPreviewFacade.getViewPreview(
							siteId,
							viewUuid as string,
							query as ViewsSearchParams
						)
					}
					icon="refresh"
					ariaLabel="Reload"
					type="primary"
					htmlType="button"
					negative
				/>
				<PaginatedTable
					fixed
					tableClassName="a-table--fixed--xs"
					columns={VIEWS_PREVIEW_COLUMNS(t)}
					rows={viewPreviewRows}
					currentPage={query.page}
					itemsPerPage={DEFAULT_SEARCH_PARAMS.limit}
					onPageChange={handlePageChange}
					totalValues={viewPreviewPaging?.totalElements || 0}
					loading={loadingState === LoadingState.Loading}
					loadDataMessage="Content items ophalen"
					noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
					hideResultsMessage
				/>
			</Container>
		);
	};

	return <DataLoader loadingState={initialLoading} render={renderTable} />;
};

export default ViewDetailPreview;
