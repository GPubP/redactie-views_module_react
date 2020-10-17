import * as Yup from 'yup';

export const FORM_VIEW_NEW_VALIDATION = Yup.object().shape({
	query: Yup.object().shape({
		contentType: Yup.mixed().when('viewType', {
			is: viewType => viewType === 'dynamic',
			then: Yup.object().shape({
				uuid: Yup.string()
					.required()
					.min(1),
			}),
		}),
		viewType: Yup.string()
			.required()
			.min(1),
	}),
});
