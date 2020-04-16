import { useEffect, useState } from 'react';

import { createView, getView, updateView, ViewSchema } from '../../services/view';
import { LoadingState } from '../../views.types';

const useView = (
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
		setLoadingState(LoadingState.Loading);

		return updateView(view)
			.then(() => {
				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	};

	const localCreateView = (view: ViewSchema): Promise<void> => {
		setLoadingState(LoadingState.Loading);

		return createView(view)
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
		getView(uuid as string)
			.then(result => {
				if (result) {
					setView(result);
				}

				setLoadingState(LoadingState.Loaded);
			})
			.catch(() => {
				setLoadingState(LoadingState.Error);
			});
	}, [uuid]);

	return [loadingState, view, localUpdateView, localCreateView];
};

export default useView;
