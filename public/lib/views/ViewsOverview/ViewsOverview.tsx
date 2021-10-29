import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import {
	DataLoader,
	FilterItem,
	LoadingState,
	OrderBy,
	parseObjToOrderBy,
	parseOrderByToObj,
	useAPIQueryParams,
	useNavigate,
} from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { FilterForm, FilterFormState } from '../../components';
import rolesRightsConnector from '../../connectors/rolesRights';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useRoutesBreadcrumbs, useViews } from '../../hooks';
import { DEFAULT_SEARCH_PARAMS } from '../../services/api';
import { ViewsSearchParams } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { MODULE_PATHS, SITES_ROOT } from '../../views.const';
import { ViewsMatchProps, ViewsRouteProps } from '../../views.types';

import { ViewsOverviewTableRow } from './ViewsOverview.types';
import { OVERVIEW_QUERY_PARAMS_CONFIG, VIEWS_OVERVIEW_COLUMNS } from './viewsOverview.const';

const ViewsOverview: FC<ViewsRouteProps<ViewsMatchProps>> = ({ match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */

	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [query, setQuery] = useAPIQueryParams(OVERVIEW_QUERY_PARAMS_CONFIG, false);
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForSite({
		siteUuid: siteId,
		onlyKeys: true,
	});
	const { navigate } = useNavigate(SITES_ROOT);
	const [t] = useCoreTranslation();
	const breadcrumbs = useRoutesBreadcrumbs();
	const [loadingState, views, viewsPaging] = useViews();

	useEffect(() => {
		if (
			loadingState !== LoadingState.Loading &&
			mySecurityRightsLoadingState !== LoadingState.Loading
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState, mySecurityRightsLoadingState]);

	useEffect(() => viewsFacade.getViews(siteId, query as ViewsSearchParams), [query, siteId]);

	/**
	 * Functions
	 */
	const onSubmit = ({ name }: FilterFormState): void => {
		setQuery({ search: name });
	};

	const createFilters = ({ name }: FilterFormState): FilterItem[] => {
		return [
			...(name
				? [
						{
							key: 'search',
							valuePrefix: 'Naam',
							value: name,
						},
				  ]
				: []),
		].filter(f => !!f.value);
	};

	const deleteAllFilters = (): void => {
		setQuery({ ...DEFAULT_SEARCH_PARAMS, search: undefined });
	};

	const deleteFilter = (item: FilterItem): void => {
		setQuery({ [item.key as string]: '' });
	};

	const handlePageChange = (pageNumber: number): void => {
		setQuery({
			page: pageNumber,
			skip: (pageNumber - 1) * DEFAULT_SEARCH_PARAMS.limit,
		});
	};

	const handleOrderBy = (orderBy: OrderBy): void => {
		setQuery({
			...parseOrderByToObj({ ...orderBy, key: `meta.${orderBy.key}` }),
		});
	};

	const filterFormState: FilterFormState = { name: query.search ?? '' };
	const activeSorting: OrderBy = parseObjToOrderBy({
		sort: query.sort ? query.sort.split('.')[1] : '',
		direction: query.direction ?? 1,
	});
	const activeFilters = createFilters(filterFormState);

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!Array.isArray(views)) {
			return null;
		}

		const viewsRows: ViewsOverviewTableRow[] = views.map(view => ({
			id: view.uuid as string,
			label: view.meta.label,
			description: view.meta.description,
			lastEditor:
				view.meta.lastEditor?.firstname || view.meta.lastEditor?.lastname
					? `${view.meta.lastEditor?.firstname || ''} ${view.meta.lastEditor?.lastname ||
							''}`
					: 'Onbekend',
			lastModified: view.meta.lastModified as string,
			navigate: (viewUuid: string) =>
				navigate(MODULE_PATHS.detailConfig, { siteId, viewUuid }),
		}));

		return (
			<>
				<FilterForm
					initialState={filterFormState}
					onCancel={deleteAllFilters}
					onSubmit={onSubmit}
					deleteActiveFilter={deleteFilter}
					activeFilters={activeFilters}
				/>
				<PaginatedTable
					fixed
					className="u-margin-top"
					tableClassName="a-table--fixed--sm"
					columns={VIEWS_OVERVIEW_COLUMNS(t, mySecurityrights)}
					rows={viewsRows}
					currentPage={query.page}
					itemsPerPage={DEFAULT_SEARCH_PARAMS.limit}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={viewsPaging?.totalElements || 0}
					loading={loadingState === LoadingState.Loading}
					loadDataMessage="Views ophalen"
					noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-RESULT'])}
				/>
			</>
		);
	};

	return (
		<>
			<ContextHeader title="Views">
				<ContextHeaderTopSection>{breadcrumbs}</ContextHeaderTopSection>
				<ContextHeaderActionsSection>
					<rolesRightsConnector.api.components.SecurableRender
						userSecurityRights={mySecurityrights}
						requiredSecurityRights={[rolesRightsConnector.securityRights.create]}
					>
						<Button
							iconLeft="plus"
							onClick={() => navigate(`${MODULE_PATHS.createSettings}`, { siteId })}
						>
							{t(CORE_TRANSLATIONS['BUTTON_CREATE-NEW'])}
						</Button>
					</rolesRightsConnector.api.components.SecurableRender>
				</ContextHeaderActionsSection>
			</ContextHeader>
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default ViewsOverview;
