import {
	Button,
	Card,
	CardBody,
	CardDescription,
	CardTitle,
	Textarea,
	TextField,
} from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
} from '@acpaas-ui/react-editorial-components';
import {
	AlertContainer,
	CopyValue,
	DeletePrompt,
	LeavePrompt,
	useDetectValueChanges,
} from '@redactie/utils';
import { ErrorMessage, Field, Formik } from 'formik';
import React, { FC, ReactElement, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useView, useViewDraft } from '../../hooks';
import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { ALERT_CONTAINER_IDS, VIEW_DETAIL_TAB_MAP } from '../../views.const';
import { ViewsDetailRouteProps, ViewsMatchProps } from '../../views.types';

import {
	SETTNGS_ALLOWED_LEAVE_PATHS,
	VIEW_SETTINGS_VALIDATION_SCHEMA,
} from './ViewDetailSettings.const';

const ViewSettings: FC<ViewsDetailRouteProps<ViewsMatchProps>> = ({
	loading,
	isCreating,
	isRemoving,
	rights,
	onSubmit,
	onDelete,
}) => {
	const [view] = useViewDraft();
	const { view: initialValues } = useView();
	const [t] = useCoreTranslation();
	const [isChanged, resetIsChanged] = useDetectValueChanges(!loading, view);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

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

	const readonly = isCreating ? false : !rights.canUpdate;

	const onDeletePromptConfirm = async (): Promise<void> => {
		if (!initialValues) {
			return;
		}

		await onDelete(initialValues);
		setShowDeleteModal(false);
	};

	const onDeletePromptCancel = (): void => {
		setShowDeleteModal(false);
	};

	/**
	 * Render
	 */

	if (!view || !initialValues) {
		return null;
	}

	const renderDelete = (): ReactElement => {
		return (
			<>
				<Card className="u-margin-top">
					<CardBody>
						<CardTitle>Verwijderen</CardTitle>
						<CardDescription>
							Opgelet: indien je deze view verwijdert kan hij niet meer gebruikt
							worden binnen een view referentie. Reeds bestaande verwijzingen naar
							deze view worden ongeldig.
						</CardDescription>
						<Button
							onClick={() => setShowDeleteModal(true)}
							className="u-margin-top"
							type="danger"
							iconLeft="trash-o"
						>
							{t(CORE_TRANSLATIONS['BUTTON_REMOVE'])}
						</Button>
					</CardBody>
				</Card>
				<DeletePrompt
					body="Ben je zeker dat je deze view wil verwijderen? Dit kan niet ongedaan gemaakt worden."
					isDeleting={isRemoving}
					show={showDeleteModal}
					onCancel={onDeletePromptCancel}
					onConfirm={onDeletePromptConfirm}
				/>
			</>
		);
	};

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
										disabled={readonly}
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
										disabled={readonly}
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
									<CopyValue
										label="UUID"
										value={view.uuid}
										buttonText={t(CORE_TRANSLATIONS.GENERAL_COPY)}
										className="col-xs-12"
									/>
								</div>
							)}
							<ActionBar className="o-action-bar--fixed" isOpen={!readonly}>
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
			{!isCreating && renderDelete()}
		</Container>
	);
};

export default ViewSettings;
