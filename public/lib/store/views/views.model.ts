import { BaseEntityState } from '@redactie/utils';

import { ResponsePaging } from '../../services/api';
import { ViewSchema } from '../../services/views';

export interface InternalState {
	readonly view: ViewSchema | null;
}

export type ViewModel = ViewSchema;

export interface ViewsState extends BaseEntityState<ViewModel, string> {
	meta?: ResponsePaging;
	view?: ViewModel;
	viewDraft?: ViewModel;
}
