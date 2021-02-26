import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';
import { useMemo } from 'react';

import { ViewSchema } from '../../services/views';
import { ccViewsFacade } from '../../store/ccViews';

const useCcViews = (key: string): [LoadingState, ViewSchema[]] => {
	const isFetching$ = useMemo(() => ccViewsFacade.selectItemIsFetching(key), [key]);
	const views$ = useMemo(() => ccViewsFacade.selectItemValue(key), [key]);
	const error$ = useMemo(() => ccViewsFacade.selectItemError(key), [key]);

	const [loading] = useObservable(isFetching$, LoadingState.Loading);
	const [views] = useObservable(views$, []);
	const [error] = useObservable(error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, views as ViewSchema[]];
};

export default useCcViews;
