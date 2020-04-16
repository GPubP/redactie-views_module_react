import { Query } from '@datorama/akita';

import { InternalState } from './internal.model';
import { internalStore, InternalStore } from './internal.store';

export class InternalQuery extends Query<InternalState> {
	constructor(protected store: InternalStore) {
		super(store);
	}
	public view$ = this.select(state => state.view);
}

export const internalQuery = new InternalQuery(internalStore);
