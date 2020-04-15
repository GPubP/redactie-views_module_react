import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { ViewSchema } from '../../services/view';

export interface ViewDetailConditionsProps extends RouteConfigComponentProps {
	view: ViewSchema;
	onSubmit: (data: any) => void;
}
