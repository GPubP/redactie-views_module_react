import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import moment from 'moment';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import DataLoader from '../../components/DataLoader/DataLoader';
import FilterForm from '../../components/FilterForm/FilterForm';
import useRoutes from '../../hooks/useRoutes/useRoutes';
import useViews from '../../hooks/useViews/useViews';
import { DEFAULT_SEARCH_PARAMS, DEFAULT_SORTING, OrderBy } from '../../services/api';
import { parseOrderBy } from '../../services/api/api.service';
import { FilterItemSchema } from '../../services/filterItems/filterItems.service.types';
import { LoadingState } from '../../types';
import { BREADCRUMB_OPTIONS } from '../../views.const';
import { generateFilterFormState } from '../../views.helpers';
import { FilterFormState, ViewsRouteProps } from '../../views.types';

import { ViewsOverviewTableRow } from './ViewsOverview.types';

const ViewsOverview: FC<ViewsRouteProps> = ({ tenantId, history }) => {
	/**
	 * Hooks
	 */
	const [activeSorting, setActiveSorting] = useState(DEFAULT_SORTING);
	const [currentPage, setCurrentPage] = useState(DEFAULT_SEARCH_PARAMS.page);
	const [filterItems, setFilterItems] = useState<FilterItemSchema[]>([]);
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);

	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], BREADCRUMB_OPTIONS);
	const [loadingState, views, viewsMeta] = useViews(searchParams);

	useEffect(() => {
		if (loadingState === LoadingState.Loaded || loadingState === LoadingState.Error) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState]);

	/**
	 * Functions
	 */
	const onSubmit = ({ name }: FilterFormState): void => {
		// Add item to filterItems for Taglist
		const request = { label: name, value: name };
		const newFilters = filterItems?.concat(request);
		// Get value array from filterItems
		const search = newFilters.map(item => item['value']);

		setFilterItems(newFilters);
		// Add array to searchParams
		setSearchParams({
			...searchParams,
			search,
		});
	};

	const deleteAllFilters = (): void => {
		// Clear filter items
		setFilterItems([]);
		// Reset search params
		setSearchParams(DEFAULT_SEARCH_PARAMS);
	};

	const deleteFilter = (item: any): void => {
		// Delete item from filterItems
		const newFilters = filterItems?.filter(el => el.value !== item.value);
		// Get value array from filterItems
		const search = newFilters.map(item => item['value']);

		setFilterItems(newFilters);
		// Add search to searchParams
		setSearchParams({
			...searchParams,
			search,
		});
	};

	const handlePageChange = (pageNumber: number): void => {
		setCurrentPage(pageNumber);

		setSearchParams({
			...searchParams,
			page: pageNumber,
			skip: (pageNumber - 1) * searchParams.limit,
		});
	};

	const handleOrderBy = (orderBy: OrderBy): void => {
		setActiveSorting(orderBy);
		setSearchParams({
			...searchParams,
			...parseOrderBy({ ...orderBy, key: `meta.${orderBy.key}` }),
		});
	};

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!views) {
			return null;
		}

		const viewsRows = views.map(view => ({
			id: view.uuid,
			label: view.meta.label,
			lastEditor: view.meta.lastEditor,
			lastModified: view.meta.lastModified,
		}));

		const viewsColumns = [
			{
				label: 'Naam',
				value: 'label',
			},
			{
				label: 'Auteur',
				value: 'lastEditor',
				disableSorting: true,
			},
			{
				label: 'Laatst aangepast',
				value: 'lastModified',
				disableSorting: true,
				format(data: string) {
					return moment(data).format('DD/MM/YYYY');
				},
			},
			{
				label: '',
				classList: ['u-text-right'],
				disableSorting: true,
				component(value: unknown, rowData: ViewsOverviewTableRow) {
					const { id } = rowData;

					return (
						<Button
							ariaLabel="Edit"
							icon="edit"
							onClick={() =>
								history.push(`/${tenantId}/content-types/${id}/bewerken`)
							}
							type="primary"
							transparent
						/>
					);
				},
			},
		];

		return (
			<>
				<FilterForm
					initialState={generateFilterFormState()}
					onCancel={deleteAllFilters}
					onSubmit={onSubmit}
					deleteActiveFilter={deleteFilter}
					activeFilters={filterItems}
				/>
				<PaginatedTable
					className="u-margin-top"
					columns={viewsColumns}
					rows={viewsRows}
					currentPage={currentPage}
					itemsPerPage={DEFAULT_SEARCH_PARAMS.limit}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={viewsMeta?.total || 0}
					loading={loadingState === LoadingState.Loading}
				/>
			</>
		);
	};

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
			<Container>
				<DataLoader loadingState={initialLoading} render={renderOverview} />
			</Container>
		</>
	);
};

export default ViewsOverview;
