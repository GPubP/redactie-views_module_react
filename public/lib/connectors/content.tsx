import { ContentAPI } from '@redactie/content-module';
import Core from '@redactie/redactie-core';

class ContentConnector {
	public api: ContentAPI;

	public readonly apiName: string = 'content-module';

	constructor() {
		this.api = Core.modules.getModuleAPI<ContentAPI>(this.apiName);
	}
}

const contentConnector = new ContentConnector();

export default contentConnector;
