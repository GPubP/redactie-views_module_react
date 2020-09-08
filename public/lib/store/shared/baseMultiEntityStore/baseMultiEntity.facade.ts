import { BaseMultiEntityQuery } from './baseMultiEntity.query';
import { GetBaseMultiEntityStateByStore } from './baseMultiEntity.state';
import { BaseMultiEntityStore } from './baseMultiEntity.store';

export class BaseMultiEntityFacade<
	S extends BaseMultiEntityStore<any>,
	SE,
	Q extends BaseMultiEntityQuery<GetBaseMultiEntityStateByStore<S>>
> {
	constructor(protected store: S, protected service: SE, protected query: Q) {}

	public readonly getItem = this.query.getItem;
	public readonly getItemValue = this.query.getItemValue;
	public readonly getItemError = this.query.getItemError;
	public readonly getIsFetching = this.query.getItemIsFetching;
	public readonly isCreating$ = this.query.isCreating$;
	public readonly isUpdating$ = this.query.isUpdating$;
}
