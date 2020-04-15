import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { ViewSchema } from '../../services/view';

export interface ViewDetailConfigProps extends RouteConfigComponentProps {
	view: ViewSchema;
	tenantId: string;
}
