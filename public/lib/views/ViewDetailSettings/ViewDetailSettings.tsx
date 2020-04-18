import { Button, TextField } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	Container,
} from '@acpaas-ui/react-editorial-components';
import { Field, Formik } from 'formik';
import kebabCase from 'lodash.kebabcase';
import React, { FC } from 'react';

import { useNavigate } from '../../hooks';
import { ViewSchema } from '../../services/view';
import { MODULE_PATHS, VIEW_DETAIL_TAB_MAP } from '../../views.const';

import { VIEW_SETTINGS_VALIDATION_SCHEMA } from './ViewDetailSettings.const';
import { ViewDetailSettingsMatchProps, ViewDetailSettingsProps } from './ViewDetailSettings.types';

const ViewSettings: FC<ViewDetailSettingsProps<ViewDetailSettingsMatchProps>> = ({
	view,
	onSubmit,
	match,
}) => {
	const { siteId } = match.params;

	/**
	 * Hooks
	 */
	const { navigate } = useNavigate();
	/**
	 * Methods
	 */
	const navigateToOverview = (): void => {
		navigate(`/sites${MODULE_PATHS.root}`, { siteId });
	};

	return (
		<Formik
			initialValues={view}
			onSubmit={(value: ViewSchema) => onSubmit(value, VIEW_DETAIL_TAB_MAP.settings)}
			validationSchema={VIEW_SETTINGS_VALIDATION_SCHEMA}
		>
			{({ submitForm, values }) => (
				<>
					<Container>
						<div className="row">
							<div className="col-xs-12 col-md-8 row middle-xs">
								<div className="col-xs-12 col-md-8">
									<Field
										as={TextField}
										label="Label"
										name="meta.label"
										required
									/>
									<div className="u-text-light u-margin-top-xs">
										Geef deze contentlijst een gebruiksvriendelijke naam,
										bijvoorbeeld &lsquo;Titel&lsquo;
									</div>
								</div>

								<div className="col-xs-12 col-md-4 u-margin-top u-margin-bottom">
									<div>
										Systeemnaam: <b>{kebabCase(values.meta.label)}</b>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12 row middle-xs u-margin-top">
								<div className="col-xs-12">
									<Field
										as={TextField}
										label="Beschrijving"
										name="meta.description"
										required
									/>
									<div className="u-text-light u-margin-top-xs">
										Geef een beschrijving voor deze content lijst.
									</div>
								</div>
							</div>
						</div>
					</Container>
					<ActionBar className="o-action-bar--fixed" isOpen>
						<ActionBarContentSection>
							<div className="u-wrapper">
								<Button
									className="u-margin-right-xs"
									onClick={submitForm}
									type="success"
								>
									Bewaar
								</Button>
								<Button onClick={navigateToOverview} outline>
									Annuleer
								</Button>
							</div>
						</ActionBarContentSection>
					</ActionBar>
				</>
			)}
		</Formik>
	);
};

export default ViewSettings;
