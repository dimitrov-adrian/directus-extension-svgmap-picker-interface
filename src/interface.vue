<template>
	<div ref="mapbox" :class="{ bordered, map: true }" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';

export default defineComponent({
	props: {
		field: {
			type: String,
			default: null,
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
	setup(props, { emit }) {
		if (!props.selector || !props.svg) return;

		const activeClassName = 'active';
		const mapbox = ref<HTMLElement>();
		const mapboxCustomCSS = ref<HTMLStyleElement>();
		const elements = ref<NodeListOf<HTMLElement>>([]);

		onMounted(() => {
			if (!mapbox.value) return;

			const shadow = mapbox.value.attachShadow({ mode: 'open' });
			shadow.innerHTML = props.svg;

			mapboxCustomCSS.value = document.createElement('style');
			mapboxCustomCSS.value.innerHTML = generateCSS();
			shadow.querySelector('svg')?.prepend(mapboxCustomCSS.value);

			try {
				elements.value = shadow.querySelectorAll(props.selector);

				elements.value.forEach((item, index) => {
					item.tabIndex = index + 1;
					item.addEventListener('keyup', keySelectHandler);
					item.addEventListener('click', clickSelectHandler);
				});

				populate(props.value);
			} catch (error) {
				window.console.warn('directus-extension-svgmap-picker: Invalid selector: %s', props.selector);
			}
		});

		watch(
			() => props.value,
			(newVal, oldVal) => {
				if (newVal === oldVal) return;
				populate(newVal);
			}
		);

		return {
			mapbox,
		};

		function populate(value: string | number) {
			if (!elements.value) return;

			for (const item of elements.value as NodeListOf<HTMLElement>) {
				item.classList.toggle(activeClassName, value ? itemValue(item) === value : false);
			}
		}

		function keySelectHandler(event: KeyboardEvent) {
			if (!(event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter')) return;
			event.preventDefault();
			emitter(this as HTMLElement);
		}

		function clickSelectHandler(event: MouseEvent) {
			event.preventDefault();
			emitter(this as HTMLElement);
		}

		function emitter(element: HTMLElement) {
			const value = itemValue(element);
			emit('input', value === props.value ? null : value);
		}

		function itemValue(item: HTMLElement) {
			return item.getAttribute('value') || item.getAttribute('data-value') || item.getAttribute('id');
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
