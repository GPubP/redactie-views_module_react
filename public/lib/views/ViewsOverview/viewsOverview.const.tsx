import { Link as AUILink, Button } from '@acpaas-ui/react-components';
import { EllipsisWithTooltip } from '@acpaas-ui/react-editorial-components';
import { TranslateFunc } from '@redactie/translations-module';
import { TableColumn } from '@redactie/utils';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import rolesRightsConnector from '../../connectors/rolesRights';
import { CORE_TRANSLATIONS } from '../../connectors/translations';
import { DEFAULT_SEARCH_PARAMS } from '../../services/api';

import { ViewsOverviewTableRow } from './ViewsOverview.types';

export const OVERVIEW_QUERY_PARAMS_CONFIG = {
	page: { defaultValue: DEFAULT_SEARCH_PARAMS.page, type: 'number' },
	limit: { defaultValue: DEFAULT_SEARCH_PARAMS.limit, type: 'number' },
	skip: { defaultValue: DEFAULT_SEARCH_PARAMS.skip, type: 'number' },
	sparse: { defaultValue: DEFAULT_SEARCH_PARAMS.sparse, type: 'boolean' },
	search: { type: 'string' },
	sort: { defaultValue: 'meta.label', type: 'string' },
	direction: { defaultValue: 1, type: 'number' },
} as const;

export const VIEWS_OVERVIEW_COLUMNS = (
	t: TranslateFunc,
	mySecurityRights: string[]
): TableColumn<ViewsOverviewTableRow>[] => {
	const canUpdate = rolesRightsConnector.api.helpers.checkSecurityRights(mySecurityRights, [
		rolesRightsConnector.securityRights.update,
	]);
	const defaultColumns: TableColumn<ViewsOverviewTableRow>[] = [
		{
			label: t(CORE_TRANSLATIONS.TABLE_NAME),
			value: 'label',
			width: canUpdate ? '45%' : '50%',
			component(value: any, { id, description }) {
				return (
					<>
						<AUILink to={`${id}/instellingen`} component={Link}>
							<EllipsisWithTooltip>{value}</EllipsisWithTooltip>
						</AUILink>
						<p className="small">
							{description ? (
								<EllipsisWithTooltip>{description}</EllipsisWithTooltip>
							) : (
								<span className="u-text-italic">
									{t(CORE_TRANSLATIONS['TABLE_NO-DESCRIPTION'])}
								</span>
							)}
						</p>
					</>
				);
			},
		},
		{
			label: 'Auteur',
			value: 'lastEditor',
			ellipsis: true,
			width: canUpdate ? '25%' : '30%',
			disableSorting: true,
		},
		{
			label: t(CORE_TRANSLATIONS['TABLE_LAST-MODIFIED']),
			value: 'lastModified',
			disableSorting: false,
			width: '20%',
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
			width: '10%',
			component(value, { id, navigate }) {
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
