import { Button } from '@acpaas-ui/react-components';
import {
	ContextHeader,
	ContextHeaderActionsSection,
	ContextHeaderTopSection,
	Table,
} from '@acpaas-ui/react-editorial-components';
import { ModuleRouteConfig, useBreadcrumbs } from '@redactie/redactie-core';
import moment from 'moment';
import React, { FC, ReactElement, useEffect, useState } from 'react';

import DataLoader from '../../components/DataLoader/DataLoader';
import FilterForm from '../../components/FilterForm/FilterForm';
import useRoutes from '../../hooks/useRoutes/useRoutes';
import useViews from '../../hooks/useViews/useViews';
import { FilterItemSchema } from '../../services/filterItems/filterItems.service.types';
import { ViewSchema } from '../../services/views';
import { DEFAULT_VIEWS_SEARCH_PARAMS } from '../../services/views/views.service.const';
import { LoadingState } from '../../types';
import { BREADCRUMB_OPTIONS } from '../../views.const';
import { generateFilterFormState } from '../../views.helpers';
import { FilterFormState, ViewsRouteProps } from '../../views.types';

const ViewsOverview: FC<ViewsRouteProps> = ({ tenantId, history }) => {
	const [filterItems, setFilterItems] = useState<FilterItemSchema[]>([]);
	const [viewsSearchParams, setViewsSearchParams] = useState(DEFAULT_VIEWS_SEARCH_PARAMS);
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], BREADCRUMB_OPTIONS);
	const [loadingState, views] = useViews(viewsSearchParams);
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);

	useEffect(() => {
		if (loadingState === LoadingState.Loaded || loadingState === LoadingState.Error) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [loadingState]);

	/**
	 * Functions
	 */
	const onSubmit = ({ name }: FilterFormState): void => {
		//add item to filterItems for Taglist
		const request = { label: name, value: name };
		const setFilter = filterItems?.concat(request);
		setFilterItems(setFilter);
		//get value array from filterItems
		const names = setFilter.map(item => {
			return item['value'];
		});
		//add array to searchParams
		setViewsSearchParams({
			...viewsSearchParams,
			search: names,
		});
	};

	const deleteAllFilters = (): void => {
		//set empty array as Taglist
		const emptyFilter: [] = [];
		setFilterItems(emptyFilter);
		//delete search param from api call
		setViewsSearchParams({
			skip: 1,
			limit: 10,
		});
	};

	const deleteFilter = (item: any): void => {
		//delete item from filterItems
		const setFilter = filterItems?.filter(el => el.value !== item.value);
		setFilterItems(setFilter);
		//get value array from filterItems
		const names = setFilter.map(item => {
			return item['value'];
		});
		//add array to searchParams
		setViewsSearchParams({
			...viewsSearchParams,
			search: names,
		});
	};

	/**
	 * Render
	 */
	const renderOverview = (): ReactElement | null => {
		if (!views) {
			return null;
		}

		const viewsRows = views.data.map(view => ({
			id: view.uuid,
			name: view.meta.label,
			author: view.meta.lastEditor,
			lastModified: view.meta.lastModified,
		}));

		const viewsColumns = [
			{
				label: 'Naam',
				value: 'name',
			},
			{
				label: 'Auteur',
				value: 'author',
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
				component(value: unknown, rowData: ViewSchema) {
					// TODO: add types for rowData
					const { id } = rowData as any;

					return (
						<Button
							ariaLabel="Edit"
							icon="edit"
							onClick={() =>
								history.push(`/${tenantId}/content-types/${id}/bewerken`)
							}
							type="primary"
							transparent
						></Button>
					);
				},
			},
		];

		return (
			<div className="u-container u-wrapper">
				<div className="u-margin-top">
					<FilterForm
						initialState={generateFilterFormState()}
						onCancel={deleteAllFilters}
						onSubmit={onSubmit}
						deleteActiveFilter={deleteFilter}
						activeFilters={filterItems}
					/>
				</div>
				<h5 className="u-margin-top">Resultaat ({viewsRows.length})</h5>
				<Table className="u-margin-top" rows={viewsRows} columns={viewsColumns} />
			</div>
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
			<DataLoader loadingState={initialLoading} render={renderOverview} />
		</>
	);
};

export default ViewsOverview;
