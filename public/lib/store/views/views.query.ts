import { isNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { ViewsState } from './views.model';
import { viewsStore } from './views.store';

export class ViewsQuery extends BaseEntityQuery<ViewsState> {
	public meta$ = this.select(state => state.meta).pipe(
		filter(meta => !isNil(meta), distinctUntilChanged())
	);
	public views$ = this.selectAll();
	public view$ = this.select(state => state.view).pipe(
		filter(view => !isNil(view), distinctUntilChanged())
	);
	public viewDraft$ = this.select(state => state.viewDraft).pipe(
		filter(viewDraft => !isNil(viewDraft), distinctUntilChanged())
	);
}

export const viewsQuery = new ViewsQuery(viewsStore);
