import { BaseEntityState, Page } from '@redactie/utils';

import { ViewPreviewSchema } from '../../services/views';

export type ViewPreviewModel = ViewPreviewSchema;

export interface ViewPreviewState extends BaseEntityState<ViewPreviewModel, string> {
	meta?: Page;
	viewPreview?: ViewPreviewModel;
}
