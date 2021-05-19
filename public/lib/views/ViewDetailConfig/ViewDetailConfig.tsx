import { Button, Card } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	LeavePrompt,
	LoadingState,
	RenderChildRoutes,
	SelectOption,
	useDetectValueChanges,
	useNavigate,
} from '@redactie/utils';
import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { FormViewNewList } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useContentTypes, useViewDraft } from '../../hooks';
import { DEFAULT_CONTENT_TYPES_SEARCH_PARAMS } from '../../services/contentTypes';
import { ViewSchema } from '../../services/views';
import { contentTypesFacade } from '../../store/contentTypes';
import { viewsFacade } from '../../store/views';
import {
	ALERT_CONTAINER_IDS,
	MODULE_PATHS,
	SITES_ROOT,
	VIEW_DETAIL_TAB_MAP,
} from '../../views.const';
import { ViewsDetailRouteProps, ViewsMatchProps } from '../../views.types';

import {
	CONFIG_ALLOWED_LEAVE_PATHS,
	CT_DEFAULT_DISABLED_OPTION,
	METHOD_OPTIONS,
} from './ViewDetailConfig.const';

const ViewConfig: FC<ViewsDetailRouteProps<ViewsMatchProps>> = ({
	loading,
	rights,
	route,
	tenantId,
	onCancel,
	onSubmit,
}) => {
	console.log('A');
	/**
	 * Hooks
	 */
	const { siteId, viewUuid } = useParams<ViewsMatchProps>();
	const [contentTypesLoading, contentTypes] = useContentTypes();
	const [view] = useViewDraft();
	const [t] = useCoreTranslation();
	const [isChanged, resetIsChanged] = useDetectValueChanges(!!view, view);
	const { navigate } = useNavigate(SITES_ROOT);
	const contentTypeOptions: SelectOption[] = useMemo(() => {
		if (Array.isArray(contentTypes)) {
			const cts = contentTypes.map(ct => ({
				key: ct.uuid,
				value: ct.uuid,
				label: ct.meta?.label,
			}));

			return [CT_DEFAULT_DISABLED_OPTION, ...cts];
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
		if (view) {
			onSubmit(view, VIEW_DETAIL_TAB_MAP.config).then(() => resetIsChanged());
		}
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
			...view,
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
			...view,
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

	if (!view) {
		return <></>;
	}

	/**
	 * Render
	 */
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
									formState={{
										query: {
											viewType: view?.query.viewType || 'dynamic',
											contentType: {
												uuid: view?.query.contentType?.uuid || '',
											},
										},
									}}
									isLoading={contentTypesLoading === LoadingState.Loading}
									methodOptions={METHOD_OPTIONS}
									readonly={!rights.canUpdate}
									onSubmit={onTypeFormChanged}
								/>
							</div>
						</Card>
					</div>
					<div className="col-xs-12">
						<RenderChildRoutes
							routes={route.routes}
							extraOptions={{
								rights,
								view,
								tenantId,
								onSubmit: onConfigChange,
							}}
						/>
					</div>
				</div>
			</Container>
			<ActionBar className="o-action-bar--fixed" isOpen={rights.canUpdate}>
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
					allowedPaths={CONFIG_ALLOWED_LEAVE_PATHS}
					when={isChanged}
					shouldBlockNavigationOnConfirm
					onConfirm={onConfigSave}
				/>
			)}
		</>
	);
};

export default ViewConfig;
