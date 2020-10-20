import { ReactElement } from 'react';

import { LoadingState } from '../../views.types';

export interface DataLoaderProps {
	errorMessage?: string;
	loadingState: LoadingState;
	notFoundMessage?: ReactElement;
	render: () => ReactElement | null;
}
