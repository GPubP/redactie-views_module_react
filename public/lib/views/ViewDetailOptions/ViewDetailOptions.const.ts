export const CT_DEFAULT_DISABLED_OPTION = {
	key: 'none',
	value: '',
	label: 'Kies een veld om op te sorteren',
	disabled: true,
};

export const BASE_SORT_OPTIONS = [
	CT_DEFAULT_DISABLED_OPTION,
	{
		key: 'meta.created',
		value: 'meta.created',
		label: 'Aanmaakdatum',
	},
	{
		key: 'meta.label',
		value: 'meta.label',
		label: 'Naam',
	},
	{
		key: 'meta.slug',
		value: 'meta.slug',
		label: 'Slug',
	},
	{
		key: 'meta.lastModified',
		value: 'meta.lastModified',
		label: 'Laatst aangepast',
	},
	{
		key: 'meta.firstPublished',
		value: 'meta.firstPublished',
		label: 'Eerste publicatiedatum',
	},
	{
		key: 'meta.issuedOn',
		value: 'meta.issuedOn',
		label: 'Uitgifte datum',
	},
];

export const ORDER_OPTIONS = [
	{
		key: 'desc',
		value: 'desc',
		label: 'Aflopend',
	},
	{
		key: 'asc',
		value: 'asc',
		label: 'Oplopend',
	},
];
