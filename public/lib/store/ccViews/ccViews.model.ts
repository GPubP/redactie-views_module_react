import { ResponseMeta } from '../../services/api';
import { ViewSchema } from '../../services/views';
import { BaseEntityState } from '../shared';

export type CcViewsModel = ViewSchema;

export interface CcViewsState extends BaseEntityState<CcViewsModel, string> {
	meta?: ResponseMeta;
	viewItem?: CcViewsModel;
}
