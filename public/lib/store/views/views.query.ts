import { Query } from '@datorama/akita';

import { InternalState } from './views.model';
import { internalStore, InternalStore } from './views.store';

export class InternalQuery extends Query<InternalState> {
	constructor(protected store: InternalStore) {
		super(store);
	}
	public view$ = this.select(state => state.view);
}

export const internalQuery = new InternalQuery(internalStore);
