import { useObservable } from '@mindspace-io/react';
import { useMemo } from 'react';

import { ViewSchema } from '../../services/views';
import { ccViewsFacade } from '../../store/ccViews';
import { LoadingState } from '../../views.types';

const useCcViewItem = (uuid: string): [LoadingState, ViewSchema | null | undefined] => {
	const isFetching$ = useMemo(() => ccViewsFacade.getIsFetching(uuid), [uuid]);
	const viewItem$ = useMemo(() => ccViewsFacade.getItemValue(uuid), [uuid]);
	const error$ = useMemo(() => ccViewsFacade.getItemError(uuid), [uuid]);

	const [loading] = useObservable(isFetching$, LoadingState.Loading);
	const [viewItem] = useObservable(viewItem$, null);
	const [error] = useObservable(error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, viewItem as ViewSchema];
};

export default useCcViewItem;