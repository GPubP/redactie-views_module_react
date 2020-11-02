import { useObservable } from '@mindspace-io/react';

import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';
import { LoadingState } from '../../views.types';

const useView = (): [LoadingState, ViewSchema | undefined, LoadingState] => {
	const [fetchLoadingState] = useObservable(viewsFacade.isFetchingOne$, LoadingState.Loading);
	const [updateLoadingState] = useObservable(viewsFacade.isUpdating$, LoadingState.Loaded);
	const [createLoadingState] = useObservable(viewsFacade.isCreating$, LoadingState.Loaded);
	const [view] = useObservable(viewsFacade.view$);
	const [error] = useObservable(viewsFacade.error$);

	const upsertLoadingState = [updateLoadingState, createLoadingState].includes(
		LoadingState.Loading
	)
		? LoadingState.Loading
		: LoadingState.Loaded;

	const loadingState = error ? LoadingState.Error : fetchLoadingState;

	return [loadingState, view, upsertLoadingState];
};

export default useView;
