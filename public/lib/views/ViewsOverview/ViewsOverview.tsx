import { Button } from '@acpaas-ui/react-components';
import {
	Container,
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	PaginatedTable,
} from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { FormikHelpers } from 'formik';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import { DataLoader, FilterForm, FilterFormState, ResetForm } from '../../components';
import rolesRightsConnector from '../../connectors/rolesRights';
import { useCoreTranslation } from '../../connectors/translations';
import { useNavigate, useRoutesBreadcrumbs, useViews } from '../../hooks';
import { DEFAULT_SEARCH_PARAMS, DEFAULT_SORTING, OrderBy } from '../../services/api';
import { parseOrderBy } from '../../services/api/api.service';
import { FilterItemSchema } from '../../services/filterItems/filterItems.service.types';
import { viewsFacade } from '../../store/views';
import { MODULE_PATHS } from '../../views.const';
import { LoadingState, ViewsMatchProps, ViewsRouteProps } from '../../views.types';

import { ViewsOverviewTableRow } from './ViewsOverview.types';
import { VIEWS_OVERVIEW_COLUMNS, VIEWS_OVERVIEW_INITIAL_FILTER_STATE } from './viewsOverview.const';

const ViewsOverview: FC<ViewsRouteProps<ViewsMatchProps>> = ({ match }) => {
	const { siteId } = match.params;
	/**
	 * Hooks
	 */
	const [activeSorting, setActiveSorting] = useState(DEFAULT_SORTING);
	const [currentPage, setCurrentPage] = useState(DEFAULT_SEARCH_PARAMS.page);
	const [filterItems, setFilterItems] = useState<FilterItemSchema[]>([]);
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);
	const [
		mySecurityRightsLoadingState,
		mySecurityrights,
	] = rolesRightsConnector.api.hooks.useMySecurityRightsForSite({
		onlyKeys: true,
	});
	const { navigate } = useNavigate();
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

	useEffect(() => viewsFacade.getViews(siteId, searchParams), [searchParams, siteId]);

	/**
	 * Functions
	 */
	const onSubmit = (
		{ name }: FilterFormState,
		formikHelpers: FormikHelpers<FilterFormState>
	): void => {
		// Add item to filterItems for Taglist
		const request = { label: name, value: name };

		// Return when search term already exist
		if (filterItems.find(filterItem => filterItem.value === name)) {
			return;
		}

		const newFilters = filterItems?.concat(request);
		// Get value array from filterItems
		const search = newFilters.map(item => item['value']);

		setFilterItems(newFilters);
		// Add array to searchParams
		setSearchParams({
			...searchParams,
			search,
		});
		formikHelpers.resetForm();
	};

	const deleteAllFilters = (resetForm: ResetForm): void => {
		// Clear filter items
		setFilterItems([]);
		// Reset search params
		setSearchParams(DEFAULT_SEARCH_PARAMS);
		resetForm();
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
				navigate(MODULE_PATHS.detailSettings, { siteId, viewUuid }),
		}));

		return (
			<>
				<FilterForm
					initialState={VIEWS_OVERVIEW_INITIAL_FILTER_STATE}
					onCancel={deleteAllFilters}
					onSubmit={onSubmit}
					deleteActiveFilter={deleteFilter}
					activeFilters={filterItems}
				/>
				<PaginatedTable
					className="u-margin-top"
					columns={VIEWS_OVERVIEW_COLUMNS(t, mySecurityrights)}
					rows={viewsRows}
					currentPage={currentPage}
					itemsPerPage={DEFAULT_SEARCH_PARAMS.limit}
					onPageChange={handlePageChange}
					orderBy={handleOrderBy}
					activeSorting={activeSorting}
					totalValues={viewsPaging?.totalElements || 0}
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
