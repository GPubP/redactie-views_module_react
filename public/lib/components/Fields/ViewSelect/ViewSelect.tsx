import { Autocomplete } from '@acpaas-ui/react-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import { getIn } from 'formik';
import React, { useContext } from 'react';
import { first } from 'rxjs/operators';

import './ViewSelect.scss';

import contentConnector from '../../../connectors/content';
import { ErrorMessage } from '../../../connectors/formRenderer';
import useCcViews from '../../../hooks/useCcViews/useCcViews';
import { ccViewsFacade } from '../../../store/ccViews';
import { LoadingState } from '../../../views.types';

const ContentSelect: React.FC<InputFieldProps> = ({
	fieldProps,
	fieldSchema,
	fieldHelperProps,
}: InputFieldProps) => {
	const config = fieldSchema.config || {};
	const { field, form } = fieldProps;

	const touch = getIn(form.touched, field.name);
	const error = getIn(form.errors, field.name);

	const state = !!error && !!touch ? 'error' : '';
	// This will be rendered on the content page so this context its needed.
	const { siteId } = useContext((contentConnector.api as any).contentTenantContext);

	const [viewLoadingState] = useCcViews();

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
					await ccViewsFacade.getViews(siteId, {
						skip: 0,
						limit: 10,
						search: [query],
						...(config.contentTypes?.length
							? { contentTypes: config.contentTypes.join(',') }
							: {}),
					});

					ccViewsFacade.views$.pipe(first()).subscribe(views => {
						const newItems = views.map(c => ({
							label: c.meta.label,
							value: c.uuid,
						}));

						cb(newItems);
					});
				}}
			></Autocomplete>
			{config.description && <small>{config.description}</small>}
			<ErrorMessage name={field.name} />
		</>
	);
};

export default ContentSelect;
