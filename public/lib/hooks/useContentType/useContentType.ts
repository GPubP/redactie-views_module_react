import { useEffect, useState } from 'react';

import { ContentTypeResponse, getContentType } from '../../services/contentTypes';
import { LoadingState } from '../../views.types';

const useContentType = (uuid: string | null = null): [LoadingState, ContentTypeResponse | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [contentType, setContentType] = useState<ContentTypeResponse | null>(null);

	useEffect(() => {
		if (!uuid) {
			return setLoadingState(LoadingState.Error);
		}

		setLoadingState(LoadingState.Loading);
		getContentType(uuid as string)
			.then(result => {
				if (result) {
					setContentType(result);
				}

				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [uuid]);

	return [loadingState, contentType];
};

export default useContentType;
