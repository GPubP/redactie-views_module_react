import { BaseEntityState } from '@redactie/utils';

import {
	ContentTypePaging,
	ContentTypeResponse,
	SparseContentTypeResponse,
} from '../../services/contentTypes';

export type ContentTypeModel = ContentTypeResponse;
export type ContentTypeModelSparse = SparseContentTypeResponse;

export interface ContentTypesState extends BaseEntityState<ContentTypeModelSparse, string> {
	meta?: ContentTypePaging;
	contentType?: ContentTypeModel;
}
