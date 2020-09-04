import { useEffect, useState } from 'react';

import { viewsApiService, ViewSchema } from '../../services/views';
import { LoadingState } from '../../views.types';

const useView = (
	siteId: string,
	uuid: string | null = null
): [
	LoadingState,
	ViewSchema | null,
	(view: ViewSchema) => Promise<void>,
	(view: ViewSchema) => Promise<void>
] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [view, setView] = useState<ViewSchema | null>(null);

	const localUpdateView = (view: ViewSchema): Promise<void> => {
		setLoadingState(LoadingState.Updating);

		return viewsApiService
			.updateView(siteId, view)
			.then(result => {
				setLoadingState(LoadingState.Loaded);
				setView(result);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	};

	const localCreateView = (view: ViewSchema): Promise<void> => {
		setLoadingState(LoadingState.Creating);

		return viewsApiService
			.createView(siteId, view)
			.then(result => {
				setLoadingState(LoadingState.Loaded);
				setView(result);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	};

	useEffect(() => {
		if (!uuid) {
			return setLoadingState(LoadingState.Error);
		}

		setLoadingState(LoadingState.Loading);
		viewsApiService
			.getView(siteId, uuid)
			.then(result => {
				if (result) {
					setView(result);
				}

				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [siteId, uuid]);

	return [loadingState, view, localUpdateView, localCreateView];
};

export default useView;
