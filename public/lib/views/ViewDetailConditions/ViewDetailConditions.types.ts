import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { ContentTypeSchema } from '../../services/contentTypes';
import { ViewSchema } from '../../services/view';

export interface ViewDetailConditionsProps extends RouteConfigComponentProps {
	view: ViewSchema;
	contentType: ContentTypeSchema;
	onSubmit: (data: ViewSchema) => void;
}
