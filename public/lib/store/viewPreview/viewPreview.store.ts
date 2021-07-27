import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { ViewPreviewModel, ViewPreviewState } from './viewPreview.model';

@StoreConfig({ name: 'viewPreview', idKey: 'uuid' })
export class ViewPreviewStore extends BaseEntityStore<ViewPreviewState, ViewPreviewModel> {}

export const viewPreviewStore = new ViewPreviewStore();
