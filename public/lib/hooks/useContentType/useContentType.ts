import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';

import { ContentTypeResponse } from '../../services/contentTypes';
import { contentTypesFacade } from '../../store/contentTypes';

const useContentType = (): [LoadingState, ContentTypeResponse | undefined] => {
	const [loading] = useObservable(contentTypesFacade.isFetchingOne$, LoadingState.Loading);
	const [contentType] = useObservable(contentTypesFacade.contentType$);
	const [error] = useObservable(contentTypesFacade.error$);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, contentType];
};

export default useContentType;
