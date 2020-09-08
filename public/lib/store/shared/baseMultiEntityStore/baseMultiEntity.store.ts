import { EntityStore, getEntityType, getIDType, StoreConfigOptions } from '@datorama/akita';

import { BaseMultiEntityState } from './baseMultiEntity.state';

const DEFAULT_INITIAL_STATE = {
	isUpdating: false,
	isCreating: false,
};

export class BaseMultiEntityStore<
	S extends BaseMultiEntityState<any, any>,
	EntityType = getEntityType<S>,
	IDType = getIDType<S>
> extends EntityStore<S, EntityType, IDType> {
	constructor(
		initialState: Partial<S> = DEFAULT_INITIAL_STATE as Partial<S>,
		options?: Partial<StoreConfigOptions>
	) {
		super(
			{
				...DEFAULT_INITIAL_STATE,
				...initialState,
			},
			options
		);
	}

	public addItem(id: IDType, item?: EntityType): void {
		this.add({
			id,
			value: null,
			error: null,
			isFetching: false,
			...item,
		} as EntityType);
	}

	public setItemValue(id: IDType, value: getEntityType<S>['value']): void {
		this.update(id, state => ({
			...state,
			value,
			error: null,
			isFetching: false,
		}));
	}

	public setItemError(id: IDType, error: any): void {
		this.update(id, state => ({
			...state,
			error,
			isFetching: false,
		}));
	}

	public setItemIsFetching(uuid: IDType, isFetching = false): void {
		this.update(uuid, state => ({
			...state,
			isFetching: isFetching,
		}));
	}

	public setIsUpdating(isUpdating = false): void {
		this.update({
			isUpdating,
		} as Partial<S>);
	}

	public setIsCreating(isCreating = false): void {
		this.update({
			isCreating,
		} as Partial<S>);
	}
}
