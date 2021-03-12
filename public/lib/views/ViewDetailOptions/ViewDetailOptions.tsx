import { Card } from '@acpaas-ui/react-components';
import React, { FC, useMemo } from 'react';

import { FormViewOptions, FormViewOptionsFormState } from '../../components';
import { useContentType, useViewDraft } from '../../hooks';
import { ViewQueryOptionsOrderBy, ViewSchema } from '../../services/views';
import { ViewsDetailConfigRouteProps } from '../../views.types';

import { BASE_SORT_OPTIONS, ORDER_OPTIONS } from './ViewDetailOptions.const';

const ViewDetailOptions: FC<ViewsDetailConfigRouteProps> = ({ rights, onSubmit }) => {
	/**
	 * HOOKS
	 */

	const [, contentType] = useContentType();
	const [view] = useViewDraft();
	const sortOptions = useMemo(
		() =>
			contentType?.fields.reduce((acc, field) => {
				if (!field.fieldType.data.generalConfig.isQueryable) {
					return acc;
				}

				return acc.concat([
					{
						key: field.name,
						value: `fields.${field.name}`,
						label: field.label,
					},
				]);
			}, BASE_SORT_OPTIONS),
		[contentType]
	);
	const optionsValue: FormViewOptionsFormState = useMemo(
		() => ({
			offset: view?.query.options.offset || 0,
			limit: view?.query.options.limit || 10,
			order: view?.query.options.order || 'desc',
			orderBy: view?.query.options.orderBy?.group
				? `${view.query.options.orderBy.group}.${view.query.options.orderBy._id}`
				: sortOptions
				? `${sortOptions[1].value}`
				: '',
		}),
		[sortOptions, view]
	);

	/**
	 * METHOD
	 */

	const parseOrderByAsField = ([, group, name]: string[]): ViewQueryOptionsOrderBy | null => {
		const field = contentType?.fields.find(field => field.name === name);

		if (!field) {
			return null;
		}

		return {
			group,
			dataType: field.dataType.uuid,
			type: field.dataType.data.type,
			label: field.label,
			max: field.generalConfig.max,
			min: field.generalConfig.min,
			multiLanguage: field.generalConfig.multiLanguage,
			operators: field.fieldType.data.operators,
			_id: field.name,
		};
	};
	const parseOrderByAsMeta = ([path, group, name]: string[]): ViewQueryOptionsOrderBy | null => {
		const metaOption = BASE_SORT_OPTIONS.find(opt => opt.value === path);

		if (!metaOption) {
			return null;
		}

		return {
			group,
			_id: name,
			label: metaOption?.label,
			dataType: 'string', // TODO: should not be needed in this scenario, fix at backend
			operators: [], // TODO: is this used?
			type: 'string', // TODO: get this from a map
		};
	};

	const onOptionsChanged = (value: FormViewOptionsFormState): void => {
		const orderByValue = value.orderBy;
		const valueToPathTest = /^(meta|fields)\.(.*)$/.exec(orderByValue);
		let orderBy: ViewQueryOptionsOrderBy | null = null;

		if (valueToPathTest) {
			orderBy =
				valueToPathTest[1] === 'meta'
					? parseOrderByAsMeta(valueToPathTest)
					: parseOrderByAsField(valueToPathTest);
		}

		const updatedView = {
			...view,
			query: {
				...(view?.query || {}),
				options: {
					...(view?.query.options || {}),
					...value,
					...(orderBy ? { orderBy } : {}),
				},
			},
		} as ViewSchema;

		onSubmit(updatedView);
	};

	if (!view) {
		return null;
	}

	/**
	 * RENDER
	 */

	return (
		<Card>
			<div className="u-margin">
				<h5>Sorteer-opties</h5>

				<FormViewOptions
					sortOptions={sortOptions || []}
					orderOptions={ORDER_OPTIONS}
					formState={optionsValue}
					onSubmit={onOptionsChanged}
				/>
			</div>
		</Card>
	);
};

export default ViewDetailOptions;
