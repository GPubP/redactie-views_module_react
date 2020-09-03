export interface ViewsOverviewTableRow {
	id: string;
	label: string;
	description: string;
	lastEditor: string;
	lastModified: string;
	navigate: (viewUuid: string) => void;
}
