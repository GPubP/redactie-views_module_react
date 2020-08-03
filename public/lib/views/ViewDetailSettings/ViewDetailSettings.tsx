import { Button, Textarea, TextField } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
} from '@acpaas-ui/react-editorial-components';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import { ErrorMessage, Field, Formik } from 'formik';
import kebabCase from 'lodash.kebabcase';
import React, { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { useCoreTranslation } from '../../connectors/translations';
import { ViewSchema } from '../../services/view';
import { VIEW_DETAIL_TAB_MAP } from '../../views.const';

import { VIEW_SETTINGS_VALIDATION_SCHEMA } from './ViewDetailSettings.const';
import { ViewDetailSettingsMatchProps, ViewDetailSettingsProps } from './ViewDetailSettings.types';

const ViewSettings: FC<ViewDetailSettingsProps<ViewDetailSettingsMatchProps>> = ({
	view,
	onCancel,
	onSubmit,
}) => {
	const isUpdate = !!view.meta.safeLabel;
	const [t] = useCoreTranslation();
	return (
		<Container>
			<Formik
				initialValues={view}
				onSubmit={(value: ViewSchema) =>
					onSubmit(
						{ ...view, meta: { ...view.meta, ...value.meta } },
						VIEW_DETAIL_TAB_MAP.settings
					)
				}
				validationSchema={VIEW_SETTINGS_VALIDATION_SCHEMA}
			>
				{({ errors, submitForm, values }) => (
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

							<div className="col-xs-12 col-md-4 u-margin-top">
								<div className="u-margin-top-xs">
									{t(CORE_TRANSLATIONS['GENERAL_SYSTEM-NAME'])}:{' '}
									<b>
										{isUpdate
											? view.meta.safeLabel
											: kebabCase(values.meta.label)}
									</b>
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
									<span>UID</span>
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
								<div className="u-wrapper">
									<Button
										className="u-margin-right-xs"
										onClick={submitForm}
										type="success"
									>
										{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
									</Button>
									<Button onClick={onCancel} outline>
										{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
									</Button>
								</div>
							</ActionBarContentSection>
						</ActionBar>
					</>
				)}
			</Formik>
		</Container>
	);
};

export default ViewSettings;
