import { ViewSchema } from '../../services/views';

import { internalStore, InternalStore } from './views.store';

export class InternalService {
	constructor(private store: InternalStore) {}

	public updateView(view: ViewSchema): void {
		this.store.update({ view });
	}
}

export const internalService = new InternalService(internalStore);
