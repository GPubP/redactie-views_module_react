import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { ViewSchema } from '../../services/view';

export interface ViewDetailOptionsProps extends RouteConfigComponentProps {
	view: ViewSchema;
	onSubmit: (data: any) => void;
}
