import { Button, Card } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection, Table } from '@acpaas-ui/react-editorial-components';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement } from 'react';

import { FormViewNewCC, NavList } from '../../components';

import {
	DUMMY_CONTENTTYPE_OPTIONS,
	DUMMY_FIELDS,
	DUMMY_METHOD_OPTIONS,
	FIELD_COLUMNS,
	VIEW_CC_NAV_LIST_ITEMS,
} from './ViewDetailConfig.const';

const ViewConfig: FC = () => {
	/**
	 * Render
	 */
	const renderTableField = (): ReactElement => {
		return <Table className="u-margin-top" columns={FIELD_COLUMNS} rows={DUMMY_FIELDS}></Table>;
	};

	const renderTableForm = (): ReactElement => {
		return (
			<Formik initialValues={DUMMY_FIELDS} onSubmit={() => console.log('submit table form')}>
				{() => <Field name="fields" placeholder="No fields" as={renderTableField} />}
			</Formik>
		);
	};

	return (
		<>
			<div className="u-container u-wrapper">
				<div className="row between-xs top-xs u-margin-bottom-lg">
					<div className="col-xs-12 u-margin-bottom">
						<Card>
							<div className="u-margin">
								<FormViewNewCC
									contentTypeOptions={DUMMY_CONTENTTYPE_OPTIONS}
									methodOptions={DUMMY_METHOD_OPTIONS}
									formState={{}}
									onSubmit={() => {
										console.log('submit filter form');
									}}
								/>
							</div>
						</Card>
					</div>
					<div className="col-xs-3">
						<Card>
							<NavList items={VIEW_CC_NAV_LIST_ITEMS} />
						</Card>
					</div>
					<div className="col-xs-9">
						<Card>
							<div className="u-margin">
								<h5>Voorwaarden</h5>

								{renderTableForm()}
							</div>
						</Card>
					</div>
				</div>
			</div>
			<ActionBar show>
				<ActionBarContentSection>
					<div className="u-wrapper">
						<Button className="u-margin-right" type="success">
							Bewaar
						</Button>
						<Button outline>Annuleer</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
		</>
	);
};

export default ViewConfig;
