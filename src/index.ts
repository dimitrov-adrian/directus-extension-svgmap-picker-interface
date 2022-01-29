import { defineInterface } from '@directus/extensions-sdk';
import InterfaceSlug from './interface.vue';

export default defineInterface({
	id: 'extension-svgmap-picker',
	name: 'SVG Map Picker',
	description: 'Select a value from a SVG map',
	icon: 'grain',
	component: InterfaceSlug,
	types: ['string', 'integer', 'bigInteger', 'uuid'],
	group: 'selection',
	options: () => {
		return [
			{
				field: 'selector',
				name: 'Selector',
				meta: {
					width: 'full',
					interface: 'input',
					options: {
						placeholder: '$t:interfaces.input-autocomplete-api.results_path',
					},
				},
			},
			{
				field: 'colorHover',
				name: '$t:interfaces.boolean.color_off',
				type: 'string',
				meta: {
					interface: 'select-color',
					width: 'half',
				},
			},
			{
				field: 'colorActive',
				name: '$t:interfaces.boolean.color_on',
				type: 'string',
				meta: {
					interface: 'select-color',
					width: 'half',
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
		];
	},
});
