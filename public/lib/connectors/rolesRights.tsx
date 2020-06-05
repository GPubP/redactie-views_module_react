import Core from '@redactie/redactie-core';
import { RolesRightsModuleAPI } from '@redactie/roles-rights-module';

class RolesRightsConnector {
	public apiName = 'roles-rights-module';
	public securityRights = {
		create: 'view_create',
		update: 'view_update',
		read: 'view_read',
	};
	public api: RolesRightsModuleAPI;

	constructor() {
		this.api = Core.modules.getModuleAPI<RolesRightsModuleAPI>(this.apiName);
	}
}

const rolesRightsConnector = new RolesRightsConnector();

export default rolesRightsConnector;
