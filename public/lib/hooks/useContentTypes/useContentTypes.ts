import { useObservable } from '@mindspace-io/react';

import { SparseContentTypeResponse } from '../../services/contentTypes';
import { contentTypesFacade } from '../../store/contentTypes';
import { LoadingState } from '../../views.types';

const useContentTypes = (): [LoadingState, SparseContentTypeResponse[]] => {
	const [loading] = useObservable(contentTypesFacade.isFetching$, LoadingState.Loading);
	const [contentTypes] = useObservable(contentTypesFacade.contentTypes$, []);
	const [error] = useObservable(contentTypesFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, contentTypes];
};

export default useContentTypes;
