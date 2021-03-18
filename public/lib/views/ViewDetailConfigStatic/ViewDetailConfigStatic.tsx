import { Button, Card } from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import { ContentSchema } from '@redactie/content-module';
import { useNavigate, useSiteContext, useTenantContext } from '@redactie/utils';
import { move } from 'ramda';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import {
	ContentSelectItem,
	FIELD_COLUMNS,
	FormEditStaticCondition,
	FormUpdateConditionalValue,
	FormViewConditionsRow,
} from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useViewDraft } from '../../hooks';
import { ViewQueryCondition } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { MODULE_PATHS, SITES_ROOT } from '../../views.const';
import { RowDnDEvent, ViewsDetailRouteProps, ViewsMatchProps } from '../../views.types';

const ViewConfigStatic: FC<ViewsDetailRouteProps> = ({ rights }) => {
	/**
	 * Hooks
	 */
	const { viewUuid } = useParams<ViewsMatchProps>();
	const { tenantId } = useTenantContext();
	const { siteId } = useSiteContext();
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
	const [showCreateConditionForm, setshowCreateConditionForm] = useState(false);
	const [view] = useViewDraft();
	const [t] = useCoreTranslation();
	const { navigate } = useNavigate(SITES_ROOT);

	const onShowEdit = (rowData: FormViewConditionsRow): void => {
		setshowCreateConditionForm(false);
		setExpandedRows({
			[rowData.uuid]: true,
		});
	};

	const conditionRows: FormViewConditionsRow[] = useMemo(() => {
		if (!view) {
			return [];
		}

		return view.query.conditions.map((condition, index) => ({
			...condition,
			index,
			onShowEdit,
			canMoveUp: index > 0,
			canMoveDown: view.query.conditions.length - 1 !== index,
		}));
	}, [view]);

	useEffect(() => {
		if (view?.query.viewType === 'dynamic') {
			navigate(MODULE_PATHS.detailConfigDynamic, { siteId, tenantId, viewUuid });
		}
	}, [navigate, siteId, tenantId, view, viewUuid]);

	/**
	 * Functions
	 */
	const parseCondition = (rawCondition: FormUpdateConditionalValue): ViewQueryCondition => {
		return {
			field: {
				group: 'meta',
				label: 'Content ID',
				type: 'string',
				_id: 'uuid',
			},
			label:
				(rawCondition.value as ContentSchema)?.meta?.label ||
				(rawCondition.value as ContentSelectItem)?.label ||
				'',
			value:
				(rawCondition.value as ContentSchema)?.uuid ||
				(rawCondition.value as ContentSelectItem).value,
			operator: { value: 'equals', label: 'equals' },
			uuid: rawCondition.uuid,
		};
	};

	/**
	 * Methods
	 */
	const showForm = (): void => {
		setshowCreateConditionForm(!showCreateConditionForm);
	};

	const updateConditions = (conditions: ViewQueryCondition[]): void => {
		if (!view) {
			return;
		}

		viewsFacade.setViewDraft({
			...view,
			query: {
				...view.query,
				conditions,
			},
		});
	};

	const onMoveRow = (from: number, to: number): void => {
		if (!view) {
			return;
		}
		const newQueryConditions = move(from, to, view.query.conditions);
		updateConditions(newQueryConditions);
	};

	const onMoveRowDnD = (source: RowDnDEvent, target: RowDnDEvent): void => {
		onMoveRow(source.index, target.index);
	};

	const updateCondition = (updatedCondition: FormUpdateConditionalValue): void => {
		if (!view) {
			return;
		}

		viewsFacade.setViewDraft({
			...view,
			query: {
				...view.query,
				conditions: view.query.conditions.map((condition, index) =>
					updatedCondition.index === index ? parseCondition(updatedCondition) : condition
				),
			},
		});

		setExpandedRows({});
	};

	const addCondition = (newCondition: FormUpdateConditionalValue): void => {
		if (!view) {
			return;
		}

		viewsFacade.setViewDraft({
			...view,
			query: {
				...view.query,
				conditions: [
					...view.query.conditions,
					parseCondition({
						...newCondition,
						uuid: uuid(),
					}),
				],
			},
		});

		setExpandedRows({});
		setshowCreateConditionForm(false);
	};

	const onDeleteCondition = (conditionIndex: number): void => {
		if (!view) {
			return;
		}

		viewsFacade.setViewDraft({
			...view,
			query: {
				...view.query,
				conditions: view.query.conditions.filter((c, index) => index !== conditionIndex),
			},
		});

		setExpandedRows({});
	};

	/**
	 * Render
	 */
	const renderConditionForm = (rowData: FormViewConditionsRow): ReactElement => {
		return (
			<FormEditStaticCondition
				formData={{
					field: rowData.field._id,
					index: rowData.index,
					value: rowData.value,
					uuid: rowData.uuid,
				}}
				onDelete={onDeleteCondition}
				onSubmit={updateCondition}
				onCancel={() => setExpandedRows({})}
			/>
		);
	};

	return (
		<Card>
			<div className="u-margin">
				<h2 className="h3">Content manueel selecteren</h2>
				<div className="row between-xs top-xs">
					<div className="col-xs-12">
						<Table
							draggable
							className="u-margin-top"
							dataKey="uuid"
							moveRow={onMoveRowDnD}
							expandedRows={expandedRows}
							columns={FIELD_COLUMNS(!rights.canUpdate, onMoveRow)}
							rows={conditionRows}
							responsive={false}
							rowExpansionTemplate={(rowData: FormViewConditionsRow) =>
								renderConditionForm(rowData)
							}
							noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
						/>
					</div>
					{rights.canUpdate && (
						<div className="col-xs-12 u-margin-top">
							{!showCreateConditionForm ? (
								<Button onClick={showForm} iconLeft="plus" type="primary">
									Voorwaarde toevoegen
								</Button>
							) : (
								<FormEditStaticCondition
									formData={{
										field: 'uuid',
										index: 0,
										value: '',
										uuid: '',
									}}
									onSubmit={addCondition}
									onCancel={() => setshowCreateConditionForm(false)}
									submitLabel={t(CORE_TRANSLATIONS.BUTTON_ADD)}
									submitType="success"
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</Card>
	);
};

export default ViewConfigStatic;
