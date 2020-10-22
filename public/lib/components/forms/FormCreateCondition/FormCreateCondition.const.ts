import { FieldOption } from './FormCreateCondition.types';

export const DEFAULT_OPERATORS = [
	{
		key: '$eq',
		value: '$eq',
		label: 'Gelijk aan',
	},
	{
		key: '$not',
		value: '$not',
		label: 'Niet gelijk aan',
	},
];

export const DEFAULT_VALIDATION_SCHEMA = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	type: 'object',
	required: ['value'],
	properties: {},
};

export const META_FILTER_OPTIONS: (FieldOption & {
	type: 'dateTime' | 'text';
	typeLabel: string;
})[] = [
	{
		key: 'meta.created',
		value: 'meta.created',
		label: 'Aanmaakdatum',
		operators: [
			{ label: 'Gelijk aan', value: '$eq', key: '$eq' },
			{ label: 'Niet gelijk aan', value: '$not', key: '$not' },
			{ label: 'Groter dan', value: '$gt', key: '$gt' },
			{ label: 'Kleiner dan', value: '$lt', key: '$lt' },
			{ label: 'Groter of gelijk dan', value: '$gte', key: '$gte' },
			{ label: 'Kleiner of gelijk dan', value: '$lte', key: '$lte' },
		],
		type: 'dateTime',
		typeLabel: 'Datum & tijd',
	},
	{
		key: 'meta.label',
		value: 'meta.label',
		label: 'Naam',
		operators: [
			{ label: 'Gelijk aan', value: '$eq', key: '$eq' },
			{ label: 'Niet gelijk aan', value: '$not', key: '$not' },
		],
		type: 'text',
		typeLabel: 'Tekst',
	},
	{
		key: 'meta.lastModified',
		value: 'meta.lastModified',
		label: 'Laatst aangepast',
		operators: [
			{ label: 'Gelijk aan', value: '$eq', key: '$eq' },
			{ label: 'Niet gelijk aan', value: '$not', key: '$not' },
			{ label: 'Groter dan', value: '$gt', key: '$gt' },
			{ label: 'Kleiner dan', value: '$lt', key: '$lt' },
			{ label: 'Groter of gelijk dan', value: '$gte', key: '$gte' },
			{ label: 'Kleiner of gelijk dan', value: '$lte', key: '$lte' },
		],
		type: 'dateTime',
		typeLabel: 'Datum & tijd',
	},
	{
		key: 'meta.firstPublished',
		value: 'meta.firstPublished',
		label: 'Eerste publicatedatum',
		operators: [
			{ label: 'Gelijk aan', value: '$eq', key: '$eq' },
			{ label: 'Niet gelijk aan', value: '$not', key: '$not' },
			{ label: 'Groter dan', value: '$gt', key: '$gt' },
			{ label: 'Kleiner dan', value: '$lt', key: '$lt' },
			{ label: 'Groter of gelijk dan', value: '$gte', key: '$gte' },
			{ label: 'Kleiner of gelijk dan', value: '$lte', key: '$lte' },
		],
		type: 'dateTime',
		typeLabel: 'Datum & tijd',
	},
];
