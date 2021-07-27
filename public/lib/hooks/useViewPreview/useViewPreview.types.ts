import { PaginationResponse } from '@datorama/akita';
import { SearchParams } from '@redactie/utils';

import { ViewModel } from '../../store/views';

export type UsePaginatedViewPreview = (
	sitesSearchParams: SearchParams,
	clearCache?: boolean
) => {
	loading: boolean;
	pagination: PaginationResponse<ViewModel> | null;
	refreshCurrentPage: () => void;
	error: any | null;
};
