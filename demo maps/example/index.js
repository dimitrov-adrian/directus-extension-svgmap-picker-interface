/**
 * Custom extension that uses svgmap picker for bundling custom map
 * Put it in your ./extensions/interfaces/CustomName/index.js
 *
 * Check: https://docs.directus.io/extensions/interfaces/#extension-entrypoint
 */
export default {
	// Custom extension entrypoint
	id: 'custom-the-matrix-choice',
	name: 'Red Pill or Blue Pill',
	description: 'Make the desition',
	icon: 'cruelty_free',
	types: ['string', 'csv'],
	group: 'selection',

	component: {
		template: `<interface-extension-svgmap-picker v-bind="{...$props, ...$attrs}" />`,

		// Override properties
		props: {
			// Value attribute source.
			valueAttr: {
				default: 'data-value',
			},

			// Border around the image.
			bordered: {
				default: false,
			},

			// Selector that match the choice options
			// (elements must have `value`, `data-value` or `id` attribute in this exact order)
			selector: {
				default: '.choice',
			},

			// Your SVG document content
			svg: {
				default: `
					<svg width="250" height="50" xmlns="http://www.w3.org/2000/svg">

						<!-- Custom styling using :hover and .active classes -->
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

						<!-- Define selectable blocks -->

						<g data-value="bue_pill" class="choice">
							<path d="M130 26c0-11 9-20 20-20h72c11 0 20 9 20 20s-9 20-20 20h-72c-11 0-20-9-20-20z" fill="#426373"/>
							<text font-size="20" y="34" x="151" fill="#B1FFFF">Blue Pill</text>
						</g>

						<g data-value="red_pill" class="choice">
							<path d="M7 26C7 15 16 6 27 6h72c11 0 20 9 20 20s-9 20-20 20H27C16 46 7 37 7 26z" fill="#805064"/>
							<text font-size="20" y="34" x="29" fill="#FFAFCC">Red Pill</text>
						</g>

					</svg>`,
			},
		},
	},
};
