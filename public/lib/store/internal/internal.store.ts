import { Store, StoreConfig } from '@datorama/akita';

import { InternalState } from './internal.model';

export const createInitialInternalState = (): InternalState => ({
	view: null,
});

@StoreConfig({ name: 'views' })
export class InternalStore extends Store<InternalState> {
	constructor() {
		super(createInitialInternalState());
	}
}

export const internalStore = new InternalStore();
