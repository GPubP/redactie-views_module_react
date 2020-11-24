import { Button, Textarea, TextField, Card, CardBody, CardTitle } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
} from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { AlertContainer, LeavePrompt, useDetectValueChanges } from '@redactie/utils';
import { ErrorMessage, Field, Formik } from 'formik';
import kebabCase from 'lodash.kebabcase';
import React, { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { useCoreTranslation } from '../../connectors/translations';
import { useView, useViewDraft } from '../../hooks';
import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { ALERT_CONTAINER_IDS, VIEW_DETAIL_TAB_MAP } from '../../views.const';

import {
	SETTNGS_ALLOWED_LEAVE_PATHS,
	VIEW_SETTINGS_VALIDATION_SCHEMA,
} from './ViewDetailSettings.const';
import { ViewDetailSettingsMatchProps, ViewDetailSettingsProps } from './ViewDetailSettings.types';

const ViewSettings: FC<ViewDetailSettingsProps<ViewDetailSettingsMatchProps>> = ({
	loading,
	onSubmit,
}) => {
	const [view] = useViewDraft();
	const [, initialValues] = useView();
	const [t] = useCoreTranslation();
	const [isChanged, resetIsChanged] = useDetectValueChanges(!loading, view);
	const isUpdate = !!view?.uuid;

	/**
	 * Methods
	 */
	const onSave = (newViewValue: ViewSchema): void => {
		onSubmit(
			{ ...(view || {}), meta: { ...view?.meta, ...newViewValue.meta } },
			VIEW_DETAIL_TAB_MAP.settings
		);
		resetIsChanged();
	};

	const onChange = (newViewValue: ViewSchema): void => {
		viewsFacade.setViewDraft(newViewValue);
	};

	/**
	 * Render
	 */
	if (!view || !initialValues) {
		return null;
	}

	return (
		<Container>
			<div className="u-margin-bottom">
				<AlertContainer containerId={ALERT_CONTAINER_IDS.settings} />
			</div>
			<Formik
				initialValues={initialValues}
				onSubmit={onSave}
				validationSchema={VIEW_SETTINGS_VALIDATION_SCHEMA}
			>
				{({ errors, submitForm, values, resetForm }) => {
					onChange(values);

					return (
						<>
							<div className="row top-xs u-margin-bottom">
								<div className="col-xs-12 col-md-8">
									<Field
										as={TextField}
										label="Label"
										name="meta.label"
										required
										state={errors.meta?.label && 'error'}
									/>
									<ErrorMessage
										className="u-text-danger"
										component="p"
										name="meta.label"
									/>
									<div className="u-text-light u-margin-top-xs">
										Geef deze contentlijst een gebruiksvriendelijke naam,
										bijvoorbeeld &lsquo;Titel&lsquo;
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xs-12">
									<Field
										as={Textarea}
										className="a-input--small"
										label="Beschrijving"
										name="meta.description"
										required
										state={errors.meta?.description && 'error'}
									/>
									<ErrorMessage
										className="u-text-danger"
										component="p"
										name="meta.description"
									/>
									<div className="u-text-light u-margin-top-xs">
										Geef een beschrijving voor deze content lijst.
									</div>
								</div>
							</div>
							{view.uuid && (
								<div className="row u-margin-top">
									<div className="col-xs-12 ">
										<label>UUID</label>
										<p className="u-margin-top-xs">
											<span className="u-text-light u-margin-right-xs">
												{view.uuid}
											</span>
											<CopyToClipboard text={view.uuid}>
												<Button
													className="u-button-as-link"
													htmlType="button"
													type="transparent"
												>
													Kopieer
												</Button>
											</CopyToClipboard>
										</p>
									</div>
								</div>
							)}
							<ActionBar className="o-action-bar--fixed" isOpen>
								<ActionBarContentSection>
									<div className="u-wrapper row end-xs">
										<Button
											className="u-margin-right-xs"
											onClick={resetForm}
											negative
										>
											{view?.uuid
												? t(CORE_TRANSLATIONS.BUTTON_CANCEL)
												: t(CORE_TRANSLATIONS.BUTTON_BACK)}
										</Button>
										<Button
											iconLeft={loading ? 'circle-o-notch fa-spin' : null}
											disabled={loading || !isChanged}
											onClick={submitForm}
											type="success"
										>
											{view?.uuid
												? t(CORE_TRANSLATIONS['BUTTON_SAVE'])
												: t(CORE_TRANSLATIONS['BUTTON_SAVE-NEXT'])}
										</Button>
									</div>
								</ActionBarContentSection>
							</ActionBar>
							<LeavePrompt
								allowedPaths={SETTNGS_ALLOWED_LEAVE_PATHS}
								when={isChanged}
								shouldBlockNavigationOnConfirm
								onConfirm={submitForm}
							/>
						</>
					);
				}}
			</Formik>
		</Container>
	);
};

export default ViewSettings;
