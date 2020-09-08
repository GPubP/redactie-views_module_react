import { useObservable } from '@mindspace-io/react';

import { ViewSchema } from '../../services/views';
import { ccViewsFacade } from '../../store/ccViews';
import { LoadingState } from '../../views.types';

const useCcViews = (key: string): [LoadingState, ViewSchema[]] => {
	const [loading] = useObservable(ccViewsFacade.getIsFetching(key), LoadingState.Loading);
	const [views] = useObservable(ccViewsFacade.getItemValue(key), []);
	const [error] = useObservable(ccViewsFacade.getItemError(key), null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, views as ViewSchema[]];
};

export default useCcViews;
