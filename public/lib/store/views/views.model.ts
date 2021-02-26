import { BaseEntityState, Page } from '@redactie/utils';

import { ViewSchema } from '../../services/views';

export interface InternalState {
	readonly view: ViewSchema | null;
}

export type ViewModel = ViewSchema;

export interface ViewsState extends BaseEntityState<ViewModel, string> {
	meta?: Page;
	view?: ViewModel;
	viewDraft?: ViewModel;
}
