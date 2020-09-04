import { StoreConfig } from '@datorama/akita';

import { BaseEntityStore } from '../shared';

import { CcViewsModel, CcViewsState } from './ccViews.model';

@StoreConfig({ name: 'views', idKey: 'uuid', resettable: true })
export class CcViewsStore extends BaseEntityStore<CcViewsState, CcViewsModel> {
	constructor(initialState: Partial<CcViewsState>) {
		super(initialState);
	}
}

export const ccViewsStore = new CcViewsStore({});
