import { useObservable } from '@mindspace-io/react';

import { ViewSchema } from '../../services/views';
import { ccViewsFacade } from '../../store/ccViews';
import { LoadingState } from '../../views.types';

const useCcViews = (): [LoadingState, ViewSchema[]] => {
	const [loading] = useObservable(ccViewsFacade.isFetching$, LoadingState.Loading);
	const [content] = useObservable(ccViewsFacade.views$, []);
	const [error] = useObservable(ccViewsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, content];
};

export default useCcViews;
