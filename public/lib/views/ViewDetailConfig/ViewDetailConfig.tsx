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
import { useCoreTranslation } from '../../connectors/translations';
import { useContentTypes } from '../../hooks';
import {
	ContentTypeSchema,
	DEFAULT_CONTENT_TYPES_SEARCH_PARAMS,
} from '../../services/contentTypes';
import { ViewSchema } from '../../services/view';
import { internalService } from '../../store/internal';
import { VIEW_DETAIL_TAB_MAP } from '../../views.const';
import { ViewsDetailRouteProps } from '../../views.types';

import { DUMMY_METHOD_OPTIONS, VIEW_CC_NAV_LIST_ITEMS } from './ViewDetailConfig.const';

const ViewConfig: FC<ViewsDetailRouteProps> = ({ view, route, tenantId, onCancel, onSubmit }) => {
	/**
	 * Hooks
	 */
	const { siteId, viewUuid } = useParams();
	const [, contentTypes] = useContentTypes(DEFAULT_CONTENT_TYPES_SEARCH_PARAMS);
	const [t] = useCoreTranslation();

	useEffect(() => {
		internalService.updateView(view);
	}, [view]);

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

	const onConfigChange = (updatedView: any): void => {
		internalService.updateView(updatedView);
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			tenantId,
			view,
			contentType: view?.query?.contentType,
			onSubmit: onConfigChange,
		});
	};

	const renderConfigSection = (): ReactElement | null => {
		if (!view?.query?.contentType) {
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
									methodOptions={DUMMY_METHOD_OPTIONS}
									formState={view}
									onSubmit={(view: ViewSchema) =>
										internalService.updateView({
											...view,
											query: {
												...view.query,
												contentType: (contentTypes?.find(
													ct => ct.uuid === view?.query?.contentType?.uuid
												) as unknown) as ContentTypeSchema,
												conditions: [],
												options: {
													offset: 0,
													limit: 10,
												},
											},
										})
									}
								/>
							</div>
						</Card>
					</div>
					{renderConfigSection()}
				</div>
			</Container>
			<ActionBar className="o-action-bar--fixed" isOpen>
				<ActionBarContentSection>
					<div className="u-wrapper">
						<Button
							onClick={onConfigSave}
							htmlType="submit"
							className="u-margin-right-xs"
							type="success"
						>
							{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
						</Button>
						<Button onClick={onCancel} outline>
							{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
						</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
		</>
	);
};

export default ViewConfig;
