import { defineInterface } from '@directus/extensions-sdk';
import InterfaceSlug from './interface.vue';

export default defineInterface({
	id: 'extension-svgmap-picker',
	name: 'SVG Map Picker',
	description: 'Select a value from a SVG map',
	icon: 'grain',
	component: InterfaceSlug,
	types: ['string', 'integer', 'bigInteger', 'uuid', 'csv'],
	// relational: true,
	// localTypes: ['m2o', 'standard'],
	group: 'selection',
	options: () => {
		return [
			{
				field: 'selector',
				name: 'CSS selector',
				meta: {
					width: 'full',
					interface: 'input',
					options: {
						trim: true,
						font: 'monospace',
						iconLeft: 'my_location',
						placeholder: '$t:interfaces.input-autocomplete-api.results_path',
					},
				},
				schema: {
					default_value: null,
				},
			},
			// Unshure if this need to be exposed?!
			// {
			// 	field: 'valueAttr',
			// 	name: 'Attribute',
			// 	meta: {
			// 		width: 'full',
			// 		interface: 'select-dropdown',
			// 		options: {
			// 			allowOther: true,
			// 			choices: [
			// 				{ text: 'data-value', value: 'data-value' },
			// 				{ text: 'id', value: 'id' },
			// 			],
			// 		},
			// 	},
			// 	schema: {
			// 		default_value: 'data-value',
			// 	},
			// },
			{
				field: 'svg',
				name: 'SVG',
				meta: {
					width: 'full',
					interface: 'input-code',
					options: {
						language: 'xml',
						placeholder: '$t:xml',
					},
				},
			},
			{
				field: 'colorHover',
				name: 'Hover Color',
				type: 'string',
				meta: {
					interface: 'select-color',
					width: 'half',
				},
				schema: {
					default_value: null,
				},
			},
			{
				field: 'colorActive',
				name: 'Active Color',
				type: 'string',
				meta: {
					interface: 'select-color',
					width: 'half',
				},
				schema: {
					default_value: null,
				},
			},
			{
				field: 'bordered',
				name: '$t:displays.formatted-value.border',
				type: 'boolean',
				meta: {
					width: 'half',
					interface: 'boolean',
					options: {
						label: '$t:displays.formatted-value.border_label',
					},
				},
				schema: {
					default_value: false,
				},
			},
		];
	},
});
