import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ViewSchema } from '../../services/view';

import { internalQuery } from './internal.query';

export const useViewFacade = (): ViewSchema | null => {
	const [view, setView] = useState<ViewSchema | null>(null);

	useEffect(() => {
		const destroyed$: Subject<boolean> = new Subject<boolean>();

		internalQuery.view$.pipe(takeUntil(destroyed$)).subscribe(view => {
			if (view) {
				return setView(view);
			}
		});

		return () => {
			destroyed$.next(true);
			destroyed$.complete();
		};
	}, []);

	return view;
};
