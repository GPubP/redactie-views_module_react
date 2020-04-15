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
import { getViews, ViewSchema } from '../../services/views';
import { LoadingState } from '../../types';
import { BREADCRUMB_OPTIONS } from '../../views.const';
import { generateFilterFormState } from '../../views.helpers';
import { FilterFormState, ViewsRouteProps } from '../../views.types';

const ViewsOverview: FC<ViewsRouteProps> = ({ tenantId, history }) => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [views, setViews] = useState<ViewSchema[] | null>(null);
	const routes = useRoutes();
	const breadcrumbs = useBreadcrumbs(routes as ModuleRouteConfig[], BREADCRUMB_OPTIONS);

	useEffect(() => {
		getViews()
			.then(data => {
				if (data?.length) {
					setViews(data);
				}
				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, []);

	/**
	 * Functions
	 */
	const onSubmit = ({ name }: FilterFormState): void => {
		//add item to filterItems for Taglist
		console.log(name);
	};

	const deleteAllFilters = (): void => {
		//set empty array as Taglist
		console.log('delete filters');
	};

	const deleteFilter = (item: any): void => {
		//delete item from filterItems
		console.log(item);
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
					console.log(data);
					return moment(data).format('DD/MM/YYYY');
				},
			},
			{
				label: '',
				classList: ['u-text-right'],
				disableSorting: true,
				component(value: unknown, rowData: unknown) {
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
						activeFilters={[]}
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
			<DataLoader loadingState={loadingState} render={renderOverview} />
		</>
	);
};

export default ViewsOverview;
