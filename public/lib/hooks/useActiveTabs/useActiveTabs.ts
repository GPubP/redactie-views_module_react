import { useMemo } from 'react';
import { ContextHeaderTab } from '@redactie/utils';

const useActiveTabs = (tabs: ContextHeaderTab[], pathname: string): ContextHeaderTab[] => {
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
