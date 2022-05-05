<template>
	<div ref="mapbox" :class="{ bordered, disabled }" />

	<div v-if="tooltips && tooltip" class="tooltip top visible" :style="tooltip.pos">
		{{ tooltip.title }}
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';

export default defineComponent({
	props: {
		type: {
			type: String,
			required: true,
		},
		autofocus: {
			type: Boolean,
			required: true,
		},
		collection: {
			type: String,
			required: true,
		},
		value: {
			type: [String, Array],
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		svg: {
			type: String,
			default: '',
		},
		selector: {
			type: String,
			default: '',
		},
		bordered: {
			type: Boolean,
			default: false,
		},
		tooltips: {
			type: Boolean,
			default: true,
		},
		valueAttr: {
			type: String,
			default: null,
		},
	},
	emits: ['input'],
	setup(props, { emit, attrs }) {
		if (!props.selector || !props.svg) return;

		const isNumericValue = ['bigInteger', 'integer'].includes(props.type);
		const haveForeignKey = attrs['field-data']?.schema?.foreign_key_column;

		const mapbox = ref<HTMLElement>();
		const elements = ref<NodeListOf<SVGElement>>();

		const tooltip = ref();

		onMounted(() => {
			if (!mapbox.value) return;

			try {
				document.createDocumentFragment().querySelector(props.selector);
			} catch (error) {
				window.console.warn('directus-extension-svgmap-picker: Invalid selector: %s', props.selector);
				return;
			}

			const svgStylesheet = document.createElement('style');
			svgStylesheet.innerHTML = generateCSS();

			const shadow = mapbox.value.attachShadow({ mode: 'closed', delegatesFocus: true });
			shadow.innerHTML = props.svg;
			shadow.querySelector('svg')?.prepend(svgStylesheet);

			if (props.tooltips) {
				mapbox.value.addEventListener('mouseleave', hideTooltip);
				mapbox.value.addEventListener('blur', hideTooltip);
			}

			elements.value = shadow.querySelectorAll(props.selector);
			elements.value?.forEach((item, index) => {
				item.tabIndex = index + 1;
				if (!index && props.autofocus) {
					item.focus();
				}

				item.addEventListener('keydown', keySelectHandler);
				item.addEventListener('click', clickSelectHandler);

				if (props.tooltips) {
					if (!item.hasAttribute('title')) {
						item.setAttribute('title', (itemValue(item) || '').toString());
					}

					item.addEventListener('mouseover', showTooltip);
					item.addEventListener('focus', showTooltip);
				}
			});

			populate(props.value);
		});

		watch(
			() => props.value,
			(newVal, oldVal) => {
				if (newVal === oldVal) return;

				if (haveForeignKey && typeof newVal === 'object') {
					populate(newVal ? newVal[haveForeignKey] : null);
					return;
				}

				populate(newVal);
			}
		);

		return {
			tooltip,
			mapbox,
		};

		function populate(value: any) {
			if (!elements.value) return;

			for (const item of elements.value) {
				const isActive = value
					? props.type === 'csv'
						? value.includes(itemValue(item))
						: itemValue(item) === value
					: false;
				requestAnimationFrame(() => item.classList.toggle('active', isActive));
			}
		}

		function keySelectHandler(this: SVGElement, event: KeyboardEvent) {
			if (event.key !== ' ' && event.key !== 'Spacebar' && event.key !== 'Enter') return;

			event.preventDefault();
			emitter(this);
		}

		function clickSelectHandler(this: SVGElement, event: MouseEvent) {
			event.preventDefault();
			emitter(this);
		}

		function showTooltip(this: SVGElement) {
			if (!mapbox.value) return;

			const elementPos = this.getBoundingClientRect();
			const parentPos = mapbox.value.getBoundingClientRect();

			tooltip.value = {
				pos: {
					top: elementPos.top - parentPos.top + 'px',
					left: elementPos.left + Math.round(elementPos.width / 2) - parentPos.left + 'px',
				},
				title: this.getAttribute('title'),
			};
		}

		function hideTooltip() {
			tooltip.value = null;
		}

		function emitter(element: SVGElement) {
			if (props.disabled) return;

			const value = itemValue(element);

			if (!value) {
				emit('input', null);
				return;
			}

			if (props.type === 'csv') {
				if (!props.value) {
					emit('input', [value]);
					return;
				}

				if ((props.value as string[]).includes(value.toString())) {
					const newValue = (props.value as string[]).filter((item: string) => item !== value);
					emit('input', newValue.length > 0 ? newValue : null);
				} else {
					emit('input', [...props.value, value]);
				}

				return;
			}

			if (value === props.value) {
				emit('input', null);
				return;
			}

			if (haveForeignKey) {
				emit('input', { [haveForeignKey]: value });
				return;
			}

			emit('input', value);
		}

		function itemValue(element: SVGElement): string | number | null {
			const value = (props.valueAttr ? element.getAttribute(props.valueAttr) : element.dataset.value) ?? null;

			if (isNumericValue && value) {
				const intValue = parseInt(value);
				return isNaN(intValue) ? null : parseInt(value);
			}

			return value;
		}

		function generateCSS() {
			return `
			${makeSelector('')} {
				cursor: pointer;
				outline: none;
				fill: var(--background-normal-alt);
				stroke: var(--background-input);
				transition: fill var(--fast);
			}
			${makeSelector(':focus-visible')},
			${makeSelector(':hover')} {
				fill: var(--primary-125);
			}
			${makeSelector('.active')} {
				fill: var(--primary);
			}
			${makeSelector('.active:hover')} {
				fill: var(--primary-110);
			}
			`;
		}

		function makeSelector(selector?: string) {
			return props.selector.split(',').map((singular) => singular + selector);
		}
	},
});
</script>

<style lang="css" scoped>
.bordered {
	padding: var(--input-padding);
	border: var(--border-width) solid var(--border-normal);
	border-radius: var(--border-radius);
	transition: border-color var(--fast) var(--transition);
}

.bordered:hover {
	border-color: var(--border-normal-alt);
}

.bordered:focus-within {
	border: var(--border-width) solid var(--primary);
}

.disabled {
	filter: grayscale(0.7);
	pointer-events: none;
}

.tooltip {
	width: fit-content;
	margin-top: -0.5em;
	text-align: center;
	transform: translate(-50%, -100%);
	transition: top var(--fast), left var(--fast);
}

.tooltip::after {
	display: none;
}
</style>
