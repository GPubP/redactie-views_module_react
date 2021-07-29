import { useObservable } from '@mindspace-io/react';
import { LoadingState, Page } from '@redactie/utils';

import { ViewPreviewSchema } from '../../services/views';
import { viewPreviewFacade } from '../../store/viewPreview';

const useViewPreview = (): [
	LoadingState,
	ViewPreviewSchema[] | null | undefined,
	Page | null | undefined
] => {
	const [loading] = useObservable(viewPreviewFacade.isFetching$, LoadingState.Loading);
	const [views] = useObservable(viewPreviewFacade.viewPreview$, null);
	const [viewsPaging] = useObservable(viewPreviewFacade.meta$, null);
	const [error] = useObservable(viewPreviewFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, views, viewsPaging];
};

export default useViewPreview;
