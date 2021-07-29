export interface ViewDetailPreviewTableRow {
	uuid: string;
	label: string;
	author: string;
	lastModified: string;
	navigate: (contentUuid: string) => void;
}
