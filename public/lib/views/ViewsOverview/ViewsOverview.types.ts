export interface ViewsOverviewTableRow {
	id: string;
	label: string;
	lastEditor: string;
	lastModified: string;
	navigate: (viewUuid: string) => void;
}
