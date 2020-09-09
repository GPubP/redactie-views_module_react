import { BaseMultiEntityFacade } from '@redactie/utils';
import { first } from 'rxjs/operators';

import { SearchParams } from '../../services/api';
import { ViewsApiService, viewsApiService } from '../../services/views';

import { ccViewsQuery, CcViewsQuery } from './ccViews.query';
import { ccViewsStore, CcViewsStore } from './ccViews.store';

export class CcViewsFacade extends BaseMultiEntityFacade<
	CcViewsStore,
	ViewsApiService,
	CcViewsQuery
> {
	public readonly views$ = this.query.views$;

	/**
	 * API integration
	 */
	public async getViews(
		key: string,
		siteId: string,
		searchParams: SearchParams,
		reload = false
	): Promise<void> {
		const oldValue = await new Promise(resolve =>
			this.query
				.getItem(key)
				.pipe(first())
				.subscribe(resolve, () => resolve(null))
		);

		if (!reload && oldValue) {
			return;
		}

		reload && oldValue ? this.store.setItemIsFetching(key, true) : this.store.addItem(key);

		return this.service
			.getViews(siteId, searchParams)
			.then(response => {
				if (response) {
					this.store.setItemValue(key, response.data);
				}
			})
			.catch(error => {
				this.store.setItemError(key, error);
			});
	}

	public async getView(siteId: string, uuid: string, reload = false): Promise<void> {
		const oldValue = await new Promise(resolve =>
			this.query
				.getItem(uuid)
				.pipe(first())
				.subscribe(resolve, () => resolve(null))
		);

		if (!reload && oldValue) {
			return;
		}

		reload && oldValue ? this.store.setItemIsFetching(uuid, true) : this.store.addItem(uuid);

		return this.service
			.getView(siteId, uuid)
			.then(response => {
				if (response) {
					this.store.setItemValue(uuid, response);
				}
			})
			.catch(error => {
				this.store.setItemError(uuid, error);
			});
	}
}

export const ccViewsFacade = new CcViewsFacade(ccViewsStore, viewsApiService, ccViewsQuery);
