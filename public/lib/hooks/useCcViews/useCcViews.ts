import { useObservable } from '@mindspace-io/react';
import { useMemo } from 'react';

import { ViewSchema } from '../../services/views';
import { ccViewsFacade } from '../../store/ccViews';
import { LoadingState } from '../../views.types';

const useCcViews = (key: string): [LoadingState, ViewSchema[]] => {
	const isFetching$ = useMemo(() => ccViewsFacade.getIsFetching(key), [key]);
	const views$ = useMemo(() => ccViewsFacade.getItemValue(key), [key]);
	const error$ = useMemo(() => ccViewsFacade.getItemError(key), [key]);

	const [loading] = useObservable(isFetching$, LoadingState.Loading);
	const [views] = useObservable(views$, []);
	const [error] = useObservable(error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, views as ViewSchema[]];
};

export default useCcViews;
