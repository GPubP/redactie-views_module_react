export const DEFAULT_OPERATORS = [
	{
		key: 'equals',
		value: 'equals',
		label: 'Equals',
	},
	{
		key: 'i',
		value: 'i',
		label: 'Contains',
	},
	{
		key: '^',
		value: '^',
		label: 'Starts with',
	},
	{
		key: '$',
		value: '$',
		label: 'Ends with',
	},
];

export const DEFAULT_VALIDATION_SCHEMA = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	required: ['value'],
	properties: {},
};
