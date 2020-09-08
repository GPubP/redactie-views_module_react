export interface BaseMultiEntityModel<EntityType, IDType = string> {
	error: any;
	isFetching: boolean;
	id: IDType;
	value: EntityType;
}
