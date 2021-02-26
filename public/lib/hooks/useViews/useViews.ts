import { useObservable } from '@mindspace-io/react';
import { LoadingState, Page } from '@redactie/utils';

import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';

const useView = (): [LoadingState, ViewSchema[] | null | undefined, Page | null | undefined] => {
	const [loading] = useObservable(viewsFacade.isFetching$, LoadingState.Loading);
	const [views] = useObservable(viewsFacade.views$, null);
	const [viewsPaging] = useObservable(viewsFacade.meta$, null);
	const [error] = useObservable(viewsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, views, viewsPaging];
};

export default useView;
