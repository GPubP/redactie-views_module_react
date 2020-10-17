import { Button, Card } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
} from '@acpaas-ui/react-editorial-components';
import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { AlertContainer, LeavePrompt, useDetectValueChanges } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { FormViewNewList } from '../../components';
import { useCoreTranslation } from '../../connectors/translations';
import { useContentTypes, useViewDraft } from '../../hooks';
import useNavigate from '../../hooks/useNavigate/useNavigate';
import { DEFAULT_CONTENT_TYPES_SEARCH_PARAMS } from '../../services/contentTypes';
import { ViewSchema } from '../../services/views';
import { contentTypesFacade } from '../../store/contentTypes';
import { viewsFacade } from '../../store/views';
import {
	ALERT_CONTAINER_IDS,
	MODULE_PATHS,
	TENANT_ROOT,
	VIEW_DETAIL_TAB_MAP,
} from '../../views.const';
import { SelectOptions } from '../../views.types';

import { METHOD_OPTIONS } from './ViewDetailConfig.const';
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
	const [view] = useViewDraft();
	const [t] = useCoreTranslation();
	const [isChanged, resetIsChanged] = useDetectValueChanges(!!view, view);
	const { navigate } = useNavigate();
	const contentTypeOptions: SelectOptions[] = useMemo(() => {
		if (Array.isArray(contentTypes)) {
			const cts = contentTypes.map(ct => ({
				key: ct.uuid,
				value: ct.uuid,
				label: ct.meta?.label,
			}));

			return [
				{
					key: 'none',
					value: '',
					label: 'Kies een content-type',
					disabled: true,
				},
				...cts,
			];
		}

		return [];
	}, [contentTypes]);

	useEffect(() => {
		contentTypesFacade.getContentTypes(siteId, DEFAULT_CONTENT_TYPES_SEARCH_PARAMS);
	}, [siteId]);

	/**
	 * Functions
	 */
	const onConfigSave = (): void => {
		onSubmit(view, VIEW_DETAIL_TAB_MAP.config);
		resetIsChanged();
	};

	const onConfigChange = (updatedView: ViewSchema): void => {
		viewsFacade.setViewDraft(updatedView);
	};

	const onDynamicChanged = (updatedView: ViewSchema): void => {
		if (
			!updatedView?.query?.contentType?.uuid ||
			(view?.query?.contentType?.uuid === updatedView.query.contentType.uuid &&
				view?.query.viewType === updatedView.query.viewType)
		) {
			return;
		}

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
	};

	const onStaticChanged = (updatedView: ViewSchema): void => {
		if (view?.query.viewType === updatedView.query.viewType) {
			return;
		}

		viewsFacade.setViewDraft({
			...updatedView,
			query: {
				...updatedView.query,
				// Only uuid is updated but not the contentType as a whole. This fixes it.
				contentType: undefined,
				conditions: [],
				options: {
					offset: 0,
					limit: 10,
				},
			},
		});
	};

	const onTypeFormChanged = (updatedView: ViewSchema): void => {
		updatedView?.query?.viewType === 'dynamic'
			? onDynamicChanged(updatedView)
			: onStaticChanged(updatedView);

		const path =
			updatedView.query.viewType === 'dynamic'
				? MODULE_PATHS.detailConfigDynamic
				: MODULE_PATHS.detailConfigStatic;
		navigate(path, { siteId, viewUuid });
	};

	/**
	 * Render
	 */
	const renderChildRoutes = (): ReactElement | null => {
		return Core.routes.render(route.routes as ModuleRouteConfig[], {
			tenantId,
			view,
			onSubmit: onConfigChange,
		});
	};

	return (
		<>
			<Container>
				<div className="u-margin-bottom">
					<AlertContainer containerId={ALERT_CONTAINER_IDS.config} />
				</div>
				<div className="row between-xs top-xs u-margin-bottom-lg">
					<div className="col-xs-12 u-margin-bottom">
						<Card>
							<div className="u-margin">
								<FormViewNewList
									contentTypeOptions={contentTypeOptions}
									methodOptions={METHOD_OPTIONS}
									formState={view}
									onSubmit={onTypeFormChanged}
								/>
							</div>
						</Card>
					</div>
					<div className="col-xs-12">{renderChildRoutes()}</div>
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
							disabled={loading || !isChanged}
							onClick={onConfigSave}
							type="success"
						>
							{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
						</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
			{view && (
				<LeavePrompt
					allowedPaths={[
						`${TENANT_ROOT}${MODULE_PATHS.detailConfigStatic}`,
						`${TENANT_ROOT}${MODULE_PATHS.detailConfigDynamic}`,
						`${TENANT_ROOT}${MODULE_PATHS.detailDynamicConditions}`,
						`${TENANT_ROOT}${MODULE_PATHS.detailDynamicOptions}`,
					]}
					when={isChanged}
					shouldBlockNavigationOnConfirm
					onConfirm={() => onConfigSave()}
				/>
			)}
		</>
	);
};

export default ViewConfig;
