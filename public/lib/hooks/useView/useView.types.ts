import { LoadingState } from '@redactie/utils';

import { ViewSchema } from '../../services/views';

export type UseView = {
	fetchingState: LoadingState;
	upsertingState: LoadingState;
	removingState: LoadingState;
	view: ViewSchema | undefined;
};
