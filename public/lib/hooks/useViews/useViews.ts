import { useObservable } from '@mindspace-io/react';

import { ResponsePaging } from '../../services/api';
import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { LoadingState } from '../../views.types';

const useView = (): [
	LoadingState,
	ViewSchema[] | null | undefined,
	ResponsePaging | null | undefined
] => {
	const [loading] = useObservable(viewsFacade.isFetching$, LoadingState.Loading);
	const [views] = useObservable(viewsFacade.views$, null);
	const [viewsPaging] = useObservable(viewsFacade.meta$, null);
	const [error] = useObservable(viewsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, views, viewsPaging];
};

export default useView;
