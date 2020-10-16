import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { ViewModel, ViewsState } from './views.model';

@StoreConfig({ name: 'views', idKey: 'uuid' })
export class ViewsStore extends BaseEntityStore<ViewsState, ViewModel> {}

export const viewsStore = new ViewsStore();
