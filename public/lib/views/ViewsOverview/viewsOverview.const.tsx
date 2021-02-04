import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import rolesRightsConnector from '../../connectors/rolesRights';
import { CORE_TRANSLATIONS } from '../../connectors/translations';

import { ViewsOverviewTableRow } from './ViewsOverview.types';

export const VIEWS_OVERVIEW_INITIAL_FILTER_STATE = {
	name: '',
};

export const VIEWS_OVERVIEW_COLUMNS = (t: TranslateFunc, mySecurityRights: string[]): any[] => {
	const canUpdate = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		rolesRightsConnector.securityRights.update,
	]);
	const defaultColumns = [
		{
			label: t(CORE_TRANSLATIONS.TABLE_NAME),
			value: 'label',
			component(value: any, rowData: ViewsOverviewTableRow) {
				return (
					<>
						<AUILink to={`${rowData.id}/instellingen`} component={Link}>
							<EllipsisWithTooltip>{value}</EllipsisWithTooltip>
						</AUILink>
						<p className="u-text-light u-margin-top-xs">
							<EllipsisWithTooltip>
								{rowData?.description || 'Geen beschrijving'}
							</EllipsisWithTooltip>
						</p>
					</>
				);
			},
		},
		{
			label: 'Auteur',
			value: 'lastEditor',
			ellipsis: true,
			width: '200px',
			disableSorting: true,
		},
		{
			label: t(CORE_TRANSLATIONS['TABLE_LAST-MODIFIED']),
			value: 'lastModified',
			disableSorting: false,
			width: '120px',
			format(data: string) {
				return moment(data).format('DD/MM/YYYY');
			},
		},
	];

	if (!canUpdate) {
		return defaultColumns;
	}

	return [
		...defaultColumns,
		{
			label: '',
			classList: ['u-text-right'],
			disableSorting: true,
			width: '100px',
			component(value: unknown, rowData: ViewsOverviewTableRow) {
				const { id, navigate } = rowData;

				return (
					<Button
						ariaLabel="Edit"
						icon="edit"
						onClick={() => navigate(id)}
						type="primary"
						transparent
					/>
				);
			},
		},
	];
};
