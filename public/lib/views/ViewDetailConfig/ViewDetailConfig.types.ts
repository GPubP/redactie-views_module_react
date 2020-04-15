import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { ViewSchema } from '../../services/view';
import { Tab } from '../../views.types';

export interface ViewDetailConfigProps extends RouteConfigComponentProps {
	view: ViewSchema;
	tenantId: string;
	onSubmit: (sectionData: any, tab: Tab) => void;
}
