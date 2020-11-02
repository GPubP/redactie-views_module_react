import { ReactElement } from 'react';

import { LoadingState } from '../../views.types';

export interface DataLoaderProps {
	errorMessage?: string;
	loadingState: LoadingState;
	notFoundMessage?: ReactElement | string;
	render: () => ReactElement | null;
}
