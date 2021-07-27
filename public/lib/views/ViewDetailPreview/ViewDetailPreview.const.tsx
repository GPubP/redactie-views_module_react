import { Button } from '@acpaas-ui/react-components';
import { TranslateFunc } from '@redactie/translations-module';
import { TableColumn } from '@redactie/utils';
import React from 'react';

import { CORE_TRANSLATIONS } from '../../connectors/translations';
import { DEFAULT_SEARCH_PARAMS } from '../../services/api';

import { ViewDetailPreviewTableRow } from './ViewDetailPreview.types';

export const PREVIEW_QUERY_PARAMS_CONFIG = {
	page: { defaultValue: DEFAULT_SEARCH_PARAMS.page, type: 'number' },
	pagesize: { defaultValue: DEFAULT_SEARCH_PARAMS.limit, type: 'number' },
} as const;

export const VIEWS_PREVIEW_COLUMNS = (
	t: TranslateFunc
): TableColumn<ViewDetailPreviewTableRow>[] => {
	return [
		{
			label: t(CORE_TRANSLATIONS.TABLE_NAME),
			value: 'label',
			width: '30%',
			disableSorting: true,
		},
		{
			label: 'Auteur',
			value: 'author',
			disableSorting: true,
			width: '10%',
		},
		{
			label: 'Laatst aangepast',
			value: 'lastModified',
			width: '10%',
			disableSorting: true,
		},
		{
			label: '',
			classList: ['u-text-right'],
			disableSorting: true,
			width: '10%',
			component(value, { navigate, uuid }) {
				return (
					<Button
						ariaLabel="Edit"
						icon="edit"
						onClick={() => navigate(uuid)}
						type="primary"
						transparent
					/>
				);
			},
		},
	];
};
