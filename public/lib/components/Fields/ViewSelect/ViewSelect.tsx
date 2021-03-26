import { Autocomplete } from '@acpaas-ui/react-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import { LoadingState, useSiteContext } from '@redactie/utils';
import { getIn } from 'formik';
import React from 'react';
import { first } from 'rxjs/operators';

import './ViewSelect.scss';

import { ErrorMessage } from '../../../connectors/formRenderer';
import useCcViews from '../../../hooks/useCcViews/useCcViews';
import { ViewSchema } from '../../../services/views';
import { ccViewsFacade } from '../../../store/ccViews';

const ContentSelect: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
	fieldHelperProps,
}) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';
	const { siteId } = useSiteContext();

	const [viewLoadingState] = useCcViews(`views_${fieldSchema.name}`);

	return (
		<>
			<Autocomplete
				label={fieldSchema.label}
				id={fieldSchema.name}
				state={state}
				multipleSelect={false}
				showSearchIcon={true}
				defaultValue={field.value}
				disabled={!!config.disabled}
				loading={viewLoadingState === LoadingState.Loading}
				onSelection={(selected: string) => {
					fieldHelperProps.setValue(selected);
				}}
				asyncItems={async (query: string, cb: (options: any[]) => void) => {
					await ccViewsFacade.getViews(
						`views_${fieldSchema.name}`,
						siteId,
						{
							skip: 0,
							limit: 10,
							search: [query],
							...(config.contentTypes?.length
								? { contentTypes: config.contentTypes.join(',') }
								: {}),
						},
						true
					);

					ccViewsFacade
						.selectItemValue(`views_${fieldSchema.name}`)
						.pipe(first())
						.subscribe(views => {
							const newItems = (views as ViewSchema[]).map(c => ({
								label: c.meta.label,
								value: c.uuid,
							}));

							cb(newItems);
						});
				}}
			/>
			{config.description ? (
				<div className="a-input a-input__wrapper">
					<small>{config.description}</small>
				</div>
			) : null}
			<ErrorMessage name={field.name} />
		</>
	);
};

export default ContentSelect;
