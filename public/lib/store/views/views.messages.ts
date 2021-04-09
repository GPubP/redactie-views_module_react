import { ViewSchema } from '../../services/views';

export const getAlertMessages = (data: ViewSchema): Record<string, any> => ({
	create: {
		success: {
			title: 'Aangemaakt',
			message: `De nieuwe view "${data.meta.label}" is succesvol aangemaakt`,
		},
		error: {
			title: 'Aanmaken mislukt',
			message: `Het aanmaken van de view "${data.meta.label}" is mislukt`,
		},
	},
	update: {
		success: {
			title: 'Bewaard',
			message: `De view "${data.meta.label}" is bewaard`,
		},
		error: {
			title: 'Bewaren mislukt',
			message: `Het bewaren de view "${data.meta.label}" is mislukt`,
		},
	},
});
