import { useMemo } from 'react';

import { Tab } from '../../views.types';

const useActiveTabs = (tabs: Tab[], pathname: string): Tab[] => {
	const activeTabs = useMemo(
		() =>
			tabs.map(tab => ({
				...tab,
				active: new RegExp(`/${tab.target}/?`).test(pathname),
			})),
		[pathname, tabs]
	);

	return activeTabs;
};

export default useActiveTabs;
