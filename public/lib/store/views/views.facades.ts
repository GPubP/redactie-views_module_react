import { alertService, BaseEntityFacade } from '@redactie/utils';

import {
	viewsApiService,
	ViewsApiService,
	ViewSchema,
	ViewsSearchParams,
} from '../../services/views';
import { ALERT_CONTAINER_IDS } from '../../views.const';

import { getAlertMessages } from './views.messages';
import { ViewsQuery, viewsQuery } from './views.query';
import { viewsStore, ViewsStore } from './views.store';

export class ViewsFacade extends BaseEntityFacade<ViewsStore, ViewsApiService, ViewsQuery> {
	public readonly meta$ = this.query.meta$;
	public readonly views$ = this.query.views$;
	public readonly view$ = this.query.view$;
	public readonly viewDraft$ = this.query.viewDraft$;

	public getViews(siteId: string, searchParams: ViewsSearchParams): void {
		const { isFetching } = this.query.getValue();

		if (isFetching) {
			return;
		}

		this.store.setIsFetching(true);

		this.service
			.getViews(siteId, searchParams)
			.then(response => {
				if (!response) {
					throw new Error('Getting views failed!');
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

	public getView(siteId: string, uuid: string): void {
		const { isFetchingOne, contentType } = this.query.getValue();
		if (isFetchingOne || contentType?.uuid === uuid) {
			return;
		}

		this.store.setIsFetchingOne(true);
		this.service
			.getView(siteId, uuid)
			.then(response => {
				if (!response) {
					throw new Error(`Getting view '${uuid}' failed!`);
				}

				this.store.update({
					view: response,
					isFetchingOne: false,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isFetchingOne: false,
				});
			});
	}

	public updateView(siteId: string, body: ViewSchema, alertId: string): Promise<void> {
		const { isUpdating } = this.query.getValue();

		if (isUpdating) {
			return Promise.resolve();
		}

		this.store.setIsUpdating(true);

		return this.service
			.updateView(siteId, body)
			.then(response => {
				if (!response) {
					throw new Error(`Updating view '${body.uuid}' failed!`);
				}

				this.store.update({
					view: response,
					viewDraft: response,
					isUpdating: false,
				});

				alertService.success(getAlertMessages(response).update.success, {
					containerId: alertId,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isUpdating: false,
				});

				alertService.danger(getAlertMessages(body).update.error, {
					containerId: alertId,
				});
			});
	}

	public createView(siteId: string, body: ViewSchema, alertId: string): void {
		const { isCreating } = this.query.getValue();

		if (isCreating) {
			return;
		}

		this.store.setIsCreating(true);

		this.service
			.createView(siteId, body)
			.then(response => {
				if (!response) {
					throw new Error(`Creating view '${body?.meta?.label}' failed!`);
				}

				this.store.update({
					view: response,
					viewDraft: response,
					isCreating: false,
				});
				alertService.success(getAlertMessages(response).create.success, {
					containerId: alertId,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isCreating: false,
				});

				alertService.danger(getAlertMessages(body).create.error, {
					containerId: alertId,
				});
			});
	}

	public async deleteView(siteId: string, body: ViewSchema): Promise<void> {
		const { isRemoving } = this.query.getValue();

		if (isRemoving) {
			return Promise.resolve();
		}

		this.store.setIsRemoving(true);

		return this.service
			.deleteView(siteId, body.uuid as string)
			.then(() => {
				this.store.update({
					view: undefined,
					viewDraft: undefined,
					isRemoving: false,
				});

				// Timeout because the alert should be visible on the overview page
				setTimeout(() => {
					alertService.success(getAlertMessages(body).delete.success, {
						containerId: ALERT_CONTAINER_IDS.overview,
					});
				}, 300);
			})
			.catch(error => {
				this.store.update({
					error,
					isRemoving: false,
				});

				alertService.danger(getAlertMessages(body).delete.error, {
					containerId: ALERT_CONTAINER_IDS.settings,
				});

				throw new Error('Deleting view failed!');
			});
	}

	public setView(view: ViewSchema): void {
		this.store.update({
			view,
		});
	}

	public setViewDraft(viewDraft: ViewSchema): void {
		this.store.update({
			viewDraft,
		});
	}

	public unsetViewDraft(): void {
		this.store.update({
			viewDraft: undefined,
		});
	}

	public unsetView(): void {
		this.store.update({
			view: undefined,
		});
	}
}

export const viewsFacade = new ViewsFacade(viewsStore, viewsApiService, viewsQuery);
