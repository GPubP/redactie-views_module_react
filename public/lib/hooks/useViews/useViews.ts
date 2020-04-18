import { useEffect, useState } from 'react';

import { SearchParams } from '../../services/api';
import { getViews, ViewsSchema } from '../../services/views';
import { LoadingState } from '../../types';

const useViews = (searchParams: SearchParams): [LoadingState, ViewsSchema | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [views, setViews] = useState<ViewsSchema | null>(null);

	useEffect(() => {
		getViews(searchParams)
			.then(result => {
				if (result?.data) {
					setViews(result);
				}
				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [searchParams]);

	return [loadingState, views];
};

export default useViews;
