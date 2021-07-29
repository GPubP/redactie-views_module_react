import { isNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { ViewPreviewState } from './viewPreview.model';
import { viewPreviewStore } from './viewPreview.store';

export class ViewPreviewQuery extends BaseEntityQuery<ViewPreviewState> {
	public meta$ = this.select(state => state.meta).pipe(
		filter(meta => !isNil(meta), distinctUntilChanged())
	);
	public viewPreview$ = this.selectAll();
}

export const viewPreviewQuery = new ViewPreviewQuery(viewPreviewStore);
