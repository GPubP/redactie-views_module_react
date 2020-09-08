import { EntityState } from '@datorama/akita';

import { BaseMultiEntityStore } from './baseMultiEntity.store';
import { BaseMultiEntityModel } from './baseMultiEntry.model';

export interface BaseMultiEntityState<E, IDType>
	extends EntityState<BaseMultiEntityModel<E, IDType>, IDType> {
	isCreating: boolean;
	isUpdating: boolean;
}

// export type getBaseMultiEntityType<S> = S extends BaseMultiEntityState<infer I, infer Y>
// 	? BaseMultiEntityModel<I, Y>
// 	: never;
// export type getBaseMultiIDType<S> = S extends BaseMultiEntityState<any, infer Y> ? Y : never;
export type GetBaseMultiEntityStateByStore<S> = S extends BaseMultiEntityStore<infer State>
	? State
	: never;
