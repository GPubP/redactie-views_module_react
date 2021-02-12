import { RouteConfigComponentProps } from '@redactie/redactie-core';
import { ContextHeaderBadge, ContextHeaderTab } from '@redactie/utils';

import { ViewSchema } from '../../services/views';
export interface ViewDetailConfigDynamicProps<
	Params extends {
		[K in keyof Params]?: string;
	} = {}
> extends RouteConfigComponentProps<Params> {
	view: ViewSchema;
	tenantId: string;
	loading: boolean;
	onCancel: () => void;
	onSubmit: (sectionData: any, tab: ContextHeaderTab) => void;
}

export interface ViewDetailConfigMatchProps {
	siteId: string;
	viewUuid: string;
}
