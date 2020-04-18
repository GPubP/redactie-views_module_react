import { useEffect, useState } from 'react';

import { ResponseMeta, SearchParams } from '../../services/api';
import { getViews, ViewSchema } from '../../services/views';
import { LoadingState } from '../../types';

type UseViewsReturn = [LoadingState, ViewSchema[], ResponseMeta | null];

const useViews = (searchParams: SearchParams): UseViewsReturn => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [views, setViews] = useState<ViewSchema[]>([]);
	const [viewsMeta, setViewsMeta] = useState<ResponseMeta | null>(null);

	useEffect(() => {
		getViews(searchParams)
			.then(result => {
				if (result?.data && result.data.length) {
					setViews(result.data);
				}
				if (result?.paging) {
					setViewsMeta(result.paging);
				}
				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [searchParams]);

	return [loadingState, views, viewsMeta];
};

export default useViews;
