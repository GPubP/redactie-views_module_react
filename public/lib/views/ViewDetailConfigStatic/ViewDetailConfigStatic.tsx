import { Button, Card } from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import { useNavigate, useSiteContext, useTenantContext } from '@redactie/utils';
import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { FormEditStaticCondition } from '../../components/forms/FormEditStaticCondition/FormEditStaticCondition';
import { FormUpdateConditionalValue } from '../../components/forms/FormEditStaticCondition/FormEditStaticCondition.types';
import { FIELD_COLUMNS } from '../../components/forms/FormViewConditions/FormViewConditions.const';
import { FormViewConditionsRow } from '../../components/forms/FormViewConditions/FormViewConditions.types';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useViewDraft } from '../../hooks';
import { ViewQueryCondition } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { MODULE_PATHS, SITES_ROOT } from '../../views.const';
import { ViewsDetailRouteProps, ViewsMatchProps } from '../../views.types';

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

	const onShowEdit = (rowData: FormViewConditionsRow, rowIndex: number): void => {
		setshowCreateConditionForm(false);
		setExpandedRows({
			[rowIndex]: true,
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
			value: rawCondition.value,
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
							className="u-margin-top"
							dataKey="index"
							expandedRows={expandedRows}
							columns={FIELD_COLUMNS}
							rows={conditionRows}
							responsive={false}
							rowExpansionTemplate={(rowData: FormViewConditionsRow) =>
								renderConditionForm(rowData)
							}
							noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
						/>
					</div>
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
								}}
								onSubmit={addCondition}
								onCancel={() => setshowCreateConditionForm(false)}
								submitLabel={t(CORE_TRANSLATIONS.BUTTON_ADD)}
								submitType="success"
							/>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ViewConfigStatic;
