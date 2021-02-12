import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { ContentTypeModelSparse, ContentTypesState } from './contentTypes.model';

@StoreConfig({ name: 'view-contentTypes', idKey: 'uuid' })
export class ContentTypesStore extends BaseEntityStore<ContentTypesState, ContentTypeModelSparse> {}

export const contentTypesStore = new ContentTypesStore();
