import { useObservable } from '@mindspace-io/react';

import { ViewSchema } from '../../services/views';
import { viewsFacade } from '../../store/views';

const useViewDraft = (): [ViewSchema | undefined] => {
	const [viewDraft] = useObservable(viewsFacade.viewDraft$);

	return [viewDraft];
};

export default useViewDraft;
