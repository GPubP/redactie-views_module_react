import { RouteConfigComponentProps } from '@redactie/redactie-core';

import { ViewSchema } from '../../services/view';
import { Tab } from '../../views.types';

export interface ViewDetailSettingsProps<
	Params extends {
		[K in keyof Params]?: string;
	} = {}
> extends RouteConfigComponentProps<Params> {
	view: ViewSchema;
	tenantId: string;
	onSubmit: (sectionData: any, tab: Tab) => void;
}

export interface ViewDetailSettingsMatchProps {
	siteId: string;
}