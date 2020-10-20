import { Button, Card } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
} from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import React, { FC, ReactElement, useEffect, useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { FormViewNewList, NavList } from '../../components';
import DataLoader from '../../components/DataLoader/DataLoader';
import { useCoreTranslation } from '../../connectors/translations';
import { useContentType, useContentTypes, useViewDraft } from '../../hooks';
import { DEFAULT_CONTENT_TYPES_SEARCH_PARAMS } from '../../services/contentTypes';
import { ViewSchema } from '../../services/views';
import { contentTypesFacade } from '../../store/contentTypes';
import { viewsFacade } from '../../store/views';
import { VIEW_DETAIL_TAB_MAP } from '../../views.const';

import { METHOD_OPTIONS, VIEW_CC_NAV_LIST_ITEMS } from './ViewDetailConfig.const';
import { ViewDetailConfigProps } from './ViewDetailConfig.types';

const ViewConfig: FC<ViewDetailConfigProps> = ({
	loading,
	route,
	tenantId,
	onCancel,
	onSubmit,
}) => {
	/**
	 * Hooks
	 */
	const { siteId, viewUuid } = useParams<Record<string, string>>();
	const [, contentTypes] = useContentTypes();
	const [contentTypeLoading, activeContentType] = useContentType();
	const [view] = useViewDraft();
	const [t] = useCoreTranslation();

	useEffect(() => {
		contentTypesFacade.getContentTypes(siteId, DEFAULT_CONTENT_TYPES_SEARCH_PARAMS);
	}, [siteId]);

	const contentTypeOptions = useMemo(() => {
		if (Array.isArray(contentTypes)) {
			const cts = contentTypes.map(ct => ({
				key: ct.uuid,
				value: ct.uuid,
				label: ct.meta?.label,
			}));

			return [
				{
					key: 'none',
					value: null,
					label: 'Kies een content-type',
					disabled: true,
				},
				...cts,
			];
		}

		return [];
	}, [contentTypes]);

	/**
	 * Functions
	 */
	const onConfigSave = (): void => {
		onSubmit(view, VIEW_DETAIL_TAB_MAP.config);
	};

	const onConfigChange = (updatedView: ViewSchema): void => {
		viewsFacade.setViewDraft(updatedView);
	};

	const onContentTypeChanged = (updatedView: ViewSchema): void => {
		if (
			updatedView?.query?.contentType?.uuid &&
			view?.query?.contentType?.uuid !== updatedView.query.contentType.uuid
		) {
			contentTypesFacade.getContentType(siteId, updatedView.query.contentType.uuid);
			viewsFacade.setViewDraft({
				...updatedView,
				query: {
					...updatedView.query,
					// Only uuid is updated but not the contentType as a whole. This fixes it.
					contentType:
						contentTypes.find(ct => ct.uuid === updatedView.query.contentType?.uuid) ||
						updatedView.query.contentType,
					conditions: [],
					options: {
						offset: 0,
						limit: 10,
					},
				},
			});
		}
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			tenantId,
			view,
			contentType: activeContentType,
			onSubmit: onConfigChange,
		});
	};

	const renderConfigSection = (): ReactElement | null => {
		if (!view?.query?.contentType || !activeContentType) {
			return null;
		}

		return (
			<>
				<div className="col-xs-3">
					<Card>
						<NavList
							items={VIEW_CC_NAV_LIST_ITEMS.map(listItem => ({
								...listItem,
								to: generatePath(`${route.path}/${listItem.to}`, {
									siteId,
									viewUuid,
								}),
							}))}
						/>
					</Card>
				</div>
				<div className="col-xs-9">{renderChildRoutes()}</div>
			</>
		);
	};

	return (
		<>
			<Container>
				<div className="row between-xs top-xs u-margin-bottom-lg">
					<div className="col-xs-12 u-margin-bottom">
						<Card>
							<div className="u-margin">
								<FormViewNewList
									contentTypeOptions={contentTypeOptions}
									methodOptions={METHOD_OPTIONS}
									formState={view}
									onSubmit={onContentTypeChanged}
								/>
							</div>
						</Card>
					</div>
					<DataLoader loadingState={contentTypeLoading} render={renderConfigSection} />
				</div>
			</Container>
			<ActionBar className="o-action-bar--fixed" isOpen>
				<ActionBarContentSection>
					<div className="u-wrapper row end-xs">
						<Button className="u-margin-right-xs" onClick={onCancel} negative>
							{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
						</Button>
						<Button
							iconLeft={loading ? 'circle-o-notch fa-spin' : null}
							disabled={loading}
							onClick={onConfigSave}
							type="success"
						>
							{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
						</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
		</>
	);
};

export default ViewConfig;
