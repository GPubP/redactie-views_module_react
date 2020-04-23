import { Button, Card } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
} from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import React, { FC, ReactElement, useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { FormViewNewList, NavList } from '../../components';
import { useContentType, useContentTypes } from '../../hooks';
import { DEFAULT_CONTENT_TYPES_SEARCH_PARAMS } from '../../services/contentTypes';
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
	const [, contentType] = useContentType(view.contentType);

	const contentTypeOptions = useMemo(() => {
		if (Array.isArray(contentTypes)) {
			return contentTypes.map(ct => ({
				key: ct.uuid,
				value: ct.uuid,
				label: ct.meta?.label,
			}));
		}

		return [];
	}, [contentTypes]);

	/**
	 * Functions
	 */

	const onConfigSave = (): void => {
		onSubmit(view, VIEW_DETAIL_TAB_MAP.configuratie);
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			tenantId,
			view,
			contentType,
			onSubmit: (newView: ViewSchema) => onSubmit(newView, VIEW_DETAIL_TAB_MAP.configuratie),
		});
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
												conditions: [],
											},
										})
									}
								/>
							</div>
						</Card>
					</div>
					{view.contentType && (
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
					)}
				</div>
			</Container>
			<ActionBar className="o-action-bar--fixed" isOpen>
				<ActionBarContentSection>
					<div className="u-wrapper">
						<Button
							onClick={onConfigSave}
							htmlType="submit"
							className="u-margin-right"
							type="success"
						>
							Bewaar
						</Button>
						<Button onClick={onCancel} outline>
							Annuleer
						</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
		</>
	);
};

export default ViewConfig;
