/**
 * Custom extension that uses svgmap picker for bundling custom map
 * Put it in your ./extensions/interfaces/CustomName/index.js
 */
export default {
	id: 'custom-the-matrix-choice',
	name: 'Red Pill or Blue Pill',
	description: 'Make the desition',
	icon: 'cruelty_free',
	types: ['string'],
	group: 'selection',

	component: {
		template: `<interface-extension-svgmap-picker v-bind="{...$props, ...$attrs}" />`,

		// Override properties
		props: {
			// Border around the image.
			bordered: {
				default: false,
			},

			// Selector that match the choice options
			// (elements must have value, data - value or id attribute)
			selector: {
				default: '.choice',
			},

			// Your SVG document content
			svg: {
				default: `
					<svg width="250" height="50" xmlns="http://www.w3.org/2000/svg">
						<style>
							.choice:hover path {
								fill-opacity: .9;
							}
							.choice:hover path {
								fill-opacity: .75;
							}
							.choice.active path {
								stroke-width: 2;
								fill-opacity: 1;
							}
						</style>
						<g id="bue_pill" class="choice">
							<path d="m130,26c0,-10.86758 9.13242,-20 20,-20l72,0c10.86758,0 20,9.13242 20,20l0,0c0,10.86758 -9.13242,20 -20,20l-72,0c-10.86758,0 -20,-9.13242 -20,-20l0,0z" stroke-width="0" stroke="#000" fill="#426373"/>
							<text text-anchor="start" font-size="20" y="34" x="151" stroke-width="0" stroke="#000" fill="#B1FFFF">Blue Pill</text>
						</g>
						<g id="red_pill" class="choice">
							<path d="m7,26c0,-10.86758 9.13242,-20 20,-20l72,0c10.86758,0 20,9.13242 20,20l0,0c0,10.86758 -9.13242,20 -20,20l-72,0c-10.86758,0 -20,-9.13242 -20,-20l0,0z" stroke-width="0" stroke="#000" fill="#805064"/>
							<text text-anchor="start" font-size="20" y="34" x="29" stroke-width="0" stroke="#000" fill="#FFAFCC">Red Pill</text>
						</g>
					</svg>`,
			},
		},
	},
};
