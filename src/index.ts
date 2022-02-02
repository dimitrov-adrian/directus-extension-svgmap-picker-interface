import { defineInterface } from '@directus/extensions-sdk';
import InterfaceSlug from './interface.vue';

export default defineInterface({
	id: 'extension-svgmap-picker',
	name: 'SVG Map Picker',
	description: 'Select a value from a SVG map',
	icon: 'grain',
	component: InterfaceSlug,
	types: ['uuid', 'string', 'text', 'integer', 'bigInteger', 'csv'],
	// There is strange bug in Directus that broke interfaces if define both standard and M2O types.
	// Anyway, for custom or "packed" extensions, simply could force to be only M2O if needs
	// relational: true,
	// localTypes: ['m2o', 'standard'],
	group: 'selection',
	options: () => {
		return [
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
			{
				field: 'tooltips',
				name: '$t:tooltip',
				type: 'boolean',
				meta: {
					width: 'half',
					interface: 'boolean',
				},
				schema: {
					default_value: true,
				},
			},
		];
	},
});
