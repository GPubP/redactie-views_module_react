import { ViewSchema } from '../../services/view';

import { internalStore, InternalStore } from './internal.store';

export class InternalService {
	constructor(private store: InternalStore) {}

	public updateView(view: ViewSchema): void {
		this.store.update({ view });
	}
}

export const internalService = new InternalService(internalStore);
