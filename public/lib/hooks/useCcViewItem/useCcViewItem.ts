import { useObservable } from '@mindspace-io/react';

import { ViewSchema } from '../../services/views';
import { ccViewsFacade } from '../../store/ccViews';
import { LoadingState } from '../../views.types';

const useCcViewItem = (): [LoadingState, ViewSchema | null | undefined] => {
	const [loading] = useObservable(ccViewsFacade.isFetching$, LoadingState.Loading);
	const [viewItem] = useObservable(ccViewsFacade.viewItem$, null);
	const [error] = useObservable(ccViewsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, viewItem];
};

export default useCcViewItem;
