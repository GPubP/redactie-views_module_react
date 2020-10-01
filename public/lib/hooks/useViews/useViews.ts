import { useEffect, useState } from 'react';

import { ResponsePaging, SearchParams } from '../../services/api';
import { viewsApiService, ViewSchema } from '../../services/views';
import { LoadingState } from '../../views.types';

type UseViewsReturn = [LoadingState, ViewSchema[], ResponsePaging | null];

const useViews = (siteId: string, searchParams: SearchParams): UseViewsReturn => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [views, setViews] = useState<ViewSchema[]>([]);
	const [viewsMeta, setViewsMeta] = useState<ResponsePaging | null>(null);

	useEffect(() => {
		setLoadingState(LoadingState.Loading);

		viewsApiService
			.getViews(siteId, searchParams)
			.then(result => {
				if (result?._embedded && result._embedded.length >= 0) {
					setViews(result._embedded);
				}
				if (result?._page) {
					setViewsMeta(result._page);
				}
				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [searchParams, siteId]);

	return [loadingState, views, viewsMeta];
};

export default useViews;
