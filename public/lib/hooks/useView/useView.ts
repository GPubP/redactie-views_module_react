import { LoadingState, useObservable } from '@redactie/utils';

import { viewsFacade } from '../../store/views';

import { UseView } from './useView.types';

const useView = (): UseView => {
	const isFetching = useObservable(viewsFacade.isFetchingOne$, LoadingState.Loading);
	const isUpdating = useObservable(viewsFacade.isUpdating$, LoadingState.Loaded);
	const isCreating = useObservable(viewsFacade.isCreating$, LoadingState.Loaded);
	const isRemoving = useObservable(viewsFacade.isRemoving$, LoadingState.Loaded);
	const view = useObservable(viewsFacade.view$);
	const error = useObservable(viewsFacade.error$);

	const upsertingState = [isUpdating, isCreating].includes(LoadingState.Loading)
		? LoadingState.Loading
		: LoadingState.Loaded;

	const fetchingState = error ? LoadingState.Error : isFetching;
	const removingState = error ? LoadingState.Error : isRemoving;

	return {
		fetchingState,
		upsertingState,
		removingState,
		view,
	};
};

export default useView;
