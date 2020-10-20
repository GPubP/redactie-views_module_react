import { BaseEntityFacade } from '@redactie/utils';

import { SearchParams } from '../../services/api';
import { viewsApiService, ViewsApiService, ViewSchema } from '../../services/views';

import { ViewsQuery, viewsQuery } from './views.query';
import { viewsStore, ViewsStore } from './views.store';

export class ViewsFacade extends BaseEntityFacade<ViewsStore, ViewsApiService, ViewsQuery> {
	public readonly meta$ = this.query.meta$;
	public readonly views$ = this.query.views$;
	public readonly view$ = this.query.view$;
	public readonly viewDraft$ = this.query.viewDraft$;

	public getViews(siteId: string, searchParams: SearchParams): void {
		const { isFetching } = this.query.getValue();

		if (isFetching) {
			return;
		}

		this.store.setIsFetching(true);

		this.service
			.getViews(siteId, searchParams)
			.then(response => {
				if (response) {
					this.store.set(response._embedded);
					this.store.update({
						meta: response._page,
						isFetching: false,
					});
				}
			})
			.catch(error => {
				this.store.update({
					error,
					isFetching: false,
				});
			});
	}

	public getView(siteId: string, uuid: string): void {
		const { isFetchingOne, contentType } = this.query.getValue();
		if (isFetchingOne || contentType?.uuid === uuid) {
			return;
		}

		this.store.setIsFetchingOne(true);
		this.service
			.getView(siteId, uuid)
			.then(response => {
				if (response) {
					this.store.update({
						view: response,
						isFetchingOne: false,
					});
				}
			})
			.catch(error => {
				this.store.update({
					error,
					isFetchingOne: false,
				});
			});
	}

	public updateView(siteId: string, body: ViewSchema): void {
		const { isUpdating } = this.query.getValue();

		if (isUpdating) {
			return;
		}

		this.store.setIsUpdating(true);

		this.service
			.updateView(siteId, body)
			.then(response => {
				if (response) {
					this.store.update({
						view: response,
						viewDraft: response,
						isUpdating: false,
					});
				}
			})
			.catch(error => {
				this.store.update({
					error,
					isUpdating: false,
				});
			});
	}

	public createView(siteId: string, body: ViewSchema): void {
		const { isCreating } = this.query.getValue();

		if (isCreating) {
			return;
		}

		this.store.setIsCreating(true);

		this.service
			.createView(siteId, body)
			.then(response => {
				if (response) {
					this.store.update({
						view: response,
						viewDraft: response,
						isCreating: false,
					});
				}
			})
			.catch(error => {
				this.store.update({
					error,
					isCreating: false,
				});
			});
	}

	public setViewDraft(viewDraft: ViewSchema): void {
		this.store.update({
			viewDraft,
		});
	}
}

export const viewsFacade = new ViewsFacade(viewsStore, viewsApiService, viewsQuery);
