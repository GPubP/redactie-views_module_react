import { BaseMultiEntityQuery } from '../shared';

import { CcViewsState } from './ccViews.model';
import { ccViewsStore } from './ccViews.store';

export class CcViewsQuery extends BaseMultiEntityQuery<CcViewsState> {
	public views$ = this.selectAll();
}

export const ccViewsQuery = new CcViewsQuery(ccViewsStore);
