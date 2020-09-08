import { StoreConfig } from '@datorama/akita';

import { BaseMultiEntityStore } from '../shared';

import { CcViewsState } from './ccViews.model';

@StoreConfig({ name: 'views', idKey: 'id', resettable: true })
export class CcViewsStore extends BaseMultiEntityStore<CcViewsState> {
	constructor(initialState: Partial<CcViewsState>) {
		super(initialState);
	}
}

export const ccViewsStore = new CcViewsStore({});
