import { useObservable } from '@mindspace-io/react';

import { ResponsePaging } from '../../services/api';
import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { LoadingState } from '../../views.types';

const useView = (): [LoadingState, ViewSchema[] | undefined, ResponsePaging | undefined] => {
	const [loading] = useObservable(viewsFacade.isFetchingOne$, LoadingState.Loading);
	const [views] = useObservable(viewsFacade.views$);
	const [viewsPaging] = useObservable(viewsFacade.meta$);
	const [error] = useObservable(viewsFacade.error$);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, views, viewsPaging];
};

export default useView;
