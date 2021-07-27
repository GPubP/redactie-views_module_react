import { BaseEntityFacade } from '@redactie/utils';

import { viewsApiService, ViewsApiService, ViewsSearchParams } from '../../services/views';

import { ViewPreviewQuery, viewPreviewQuery } from './viewPreview.query';
import { viewPreviewStore, ViewPreviewStore } from './viewPreview.store';

export class ViewPreviewFacade extends BaseEntityFacade<
	ViewPreviewStore,
	ViewsApiService,
	ViewPreviewQuery
> {
	public readonly meta$ = this.query.meta$;
	public readonly viewPreview$ = this.query.viewPreview$;

	public getViewPreview(siteId: string, viewId: string, searchParams: ViewsSearchParams): void {
		const { isFetching } = this.query.getValue();

		if (isFetching) {
			return;
		}

		this.store.setIsFetching(true);

		this.service
			.getViewPreview(siteId, viewId, searchParams)
			.then(response => {
				if (!response) {
					throw new Error('Getting view preview failed!');
				}

				this.store.set(response._embedded);
				this.store.update({
					meta: response._page,
					isFetching: false,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isFetching: false,
				});
			});
	}
}

export const viewPreviewFacade = new ViewPreviewFacade(
	viewPreviewStore,
	viewsApiService,
	viewPreviewQuery
);
