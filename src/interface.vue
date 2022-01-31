<template>
	<div ref="mapbox" :class="{ bordered, map: true }" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';

export default defineComponent({
	props: {
		type: {
			type: String,
			required: true,
		},
		collection: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		selector: {
			required: true,
			type: String,
		},
		svg: {
			type: String,
			default: null,
		},
		colorHover: {
			type: String,
			default: null,
		},
		colorActive: {
			type: String,
			default: null,
		},
		bordered: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['input'],
	setup(props, { emit, attrs }) {
		if (!props.selector || !props.svg) return;

		const activeClassName = 'active';
		const isNumericValue = ['bigInteger', 'integer'].includes(props.type);
		const haveForeignKey = attrs['field-data']?.schema?.foreign_key_column;

		const mapbox = ref<HTMLElement>();
		const mapboxCustomCSS = ref<HTMLStyleElement>();
		const elements = ref<NodeListOf<HTMLElement>>();

		onMounted(() => {
			if (!mapbox.value) return;

			const shadow = mapbox.value.attachShadow({ mode: 'open' });
			shadow.innerHTML = props.svg;

			mapboxCustomCSS.value = document.createElement('style');
			mapboxCustomCSS.value.innerHTML = generateCSS();
			shadow.querySelector('svg')?.prepend(mapboxCustomCSS.value);

			try {
				document.createDocumentFragment().querySelector(props.selector);
			} catch (error) {
				window.console.warn('directus-extension-svgmap-picker: Invalid selector: %s', props.selector);
			}

			elements.value = shadow.querySelectorAll(props.selector);
			elements.value?.forEach((item, index) => {
				item.tabIndex = index + 1;
				item.addEventListener('keyup', keySelectHandler);
				item.addEventListener('click', clickSelectHandler);
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
			mapbox,
		};

		function populate(value: any) {
			if (!elements.value) return;

			for (const item of elements.value as NodeListOf<HTMLElement>) {
				const isActive = value
					? props.type === 'csv'
						? value.includes(itemValue(item))
						: itemValue(item) === value
					: false;
				item.classList.toggle(activeClassName, isActive);
			}
		}

		function keySelectHandler(this: HTMLElement, event: KeyboardEvent) {
			if (!(event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter')) return;

			event.preventDefault();
			emitter(this);
		}

		function clickSelectHandler(this: HTMLElement, event: MouseEvent) {
			event.preventDefault();
			emitter(this);
		}

		function emitter(element: HTMLElement) {
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

				if (props.value.includes(value)) {
					const newValue = props.value.filter((item: string) => item !== value);
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

		function itemValue(item: HTMLElement): string | number | null {
			const value = item.getAttribute('value') || item.getAttribute('data-value') || item.getAttribute('id');
			if (isNumericValue) return value ? parseInt(value) || null : null;

			return value;
		}

		function generateCSS() {
			return `
			${props.selector} {
				cursor: pointer;
				outline: none;
			}
			${props.selector}:focus-visible,
			${props.selector}:hover {
				fill: ${props.colorHover || 'var(--v-button-background-color-hover)'};
			}
			${props.selector}.active {
				fill: ${props.colorActive || 'var(--v-button-background-color-active)'};
			}`;
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
</style>
