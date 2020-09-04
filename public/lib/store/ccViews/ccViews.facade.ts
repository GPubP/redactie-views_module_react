import { SearchParams } from '../../services/api';
import { ViewsApiService, viewsApiService } from '../../services/views';
import { BaseEntityFacade } from '../shared';

import { ccViewsQuery, CcViewsQuery } from './ccViews.query';
import { ccViewsStore, CcViewsStore } from './ccViews.store';

export class CcViewsFacade extends BaseEntityFacade<CcViewsStore, ViewsApiService, CcViewsQuery> {
	public readonly views$ = this.query.views$;
	public readonly viewItem$ = this.query.viewItem$;

	/**
	 * API integration
	 */
	public getViews(siteId: string, searchParams: SearchParams): Promise<void> {
		this.store.setIsFetching(true);

		return this.service
			.getViews(siteId, searchParams)
			.then(response => {
				if (response) {
					this.store.set(response.data);
					this.store.update({
						meta: response.paging,
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

	public getView(siteId: string, uuid: string): Promise<void> {
		this.store.setIsFetchingOne(true);

		return this.service
			.getView(siteId, uuid)
			.then(response => {
				if (response) {
					this.store.update({
						viewItem: response,
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
}

export const ccViewsFacade = new CcViewsFacade(ccViewsStore, viewsApiService, ccViewsQuery);
