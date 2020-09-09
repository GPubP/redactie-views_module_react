import { BaseMultiEntityState } from '@redactie/utils';

import { ViewSchema } from '../../services/views';

export type CcViewsModel = ViewSchema | ViewSchema[];

export type CcViewsState = BaseMultiEntityState<CcViewsModel, string>;
