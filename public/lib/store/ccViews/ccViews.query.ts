import { isNil } from '@datorama/akita';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { BaseEntityQuery } from '../shared';

import { CcViewsState } from './ccViews.model';
import { ccViewsStore } from './ccViews.store';

export class CcViewsQuery extends BaseEntityQuery<CcViewsState> {
	public views$ = this.selectAll();
	public viewItem$ = this.select(state => state.viewItem).pipe(
		filter(viewItem => !isNil(viewItem), distinctUntilChanged())
	);
}

export const ccViewsQuery = new CcViewsQuery(ccViewsStore);
