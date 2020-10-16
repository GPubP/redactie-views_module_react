import { Card } from '@acpaas-ui/react-components';
import React, { FC, useMemo } from 'react';

import { FormViewOptions } from '../../components';
import { FormViewOptionsFormState } from '../../components/forms/FormViewOptions/FormViewOptions.types';
import { useContentType, useViewDraft } from '../../hooks';
import { ViewQueryOptionsOrderBy } from '../../services/views';

import { BASE_SORT_OPTIONS, ORDER_OPTIONS } from './ViewDetailOptions.const';
import { ViewDetailOptionsProps } from './ViewDetailOptions.types';

const ViewDetailOptions: FC<ViewDetailOptionsProps> = ({ onSubmit }) => {
	/**
	 * HOOKS
	 */
	const [, contentType] = useContentType();
	const [view] = useViewDraft();
	const optionsValue: FormViewOptionsFormState = useMemo(
		() => ({
			offset: view?.query.options.offset || 0,
			limit: view?.query.options.limit || 10,
			order: view?.query.options.order || 'asc',
			orderBy: `${view?.query.options.orderBy?.group}.${view?.query.options.orderBy?._id}`,
		}),
		[view]
	);
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

		if (!valueToPathTest) {
			return;
		}

		const orderBy =
			valueToPathTest && valueToPathTest[1] === 'meta'
				? parseOrderByAsMeta(valueToPathTest)
				: parseOrderByAsField(valueToPathTest);

		const updatedView = {
			...view,
			query: {
				...(view?.query || {}),
				options: {
					...(view?.query.options || {}),
					...value,
					orderBy,
				},
			},
		};

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
