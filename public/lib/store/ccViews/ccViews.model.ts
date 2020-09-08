import { ViewSchema } from '../../services/views';
import { BaseMultiEntityState } from '../shared';

export type CcViewsModel = ViewSchema | ViewSchema[];

export type CcViewsState = BaseMultiEntityState<CcViewsModel, string>;
