> This extension is under development, it may take breaking changes.

# SVG Map Picker

Select a value from a SVG Map box. Basically it's intended to be a select-dropdown or checkboxes replacement, where is
required to pick a value from predefined list, and is nice to have good visual feedback.

Example usages could be:

- Regional maps (where region code or ID is required to emit, instead of GEO location)
- Automotive part (for example linked to categories)
- Human body parts

... etc

![](https://raw.githubusercontent.com/dimitrov-adrian/directus-extension-svgmap-picker-interface/main/screenshot.png)

## Installation

In your Directus installation root

```bash
npm install directus-extension-svgmap-picker-interface
```

Restart directus

## How to use

1. Create new standard field with String or Numeric type
2. For interface select **SVG Map Picker**
3. Setup the selector to match all targeted elements
4. Put your SVG image as a XML document in the SVG field

## FAQ

### What type of SVG I can use?

You can use whatever SVGs you like, it is just necessery to have proper selection (such as class) and have `data-value`
attribute with desired values.

### Can I use hover/active custom styles in place of the colors of picker?

Yes, just use `:hover` pseudo class for hovering effect and `.active` class name for current selected item.

### How to use as M2O interface?

Just setup and ensure the `data-value` is setup to coresponding allowed ID of target collection.

### Can I bundle with own SVG in order to reduce manual work?

Yes, you could benefit from the reusability and custom Directus extensions, so you could create your own "bundle"
version, just take in mind that you still need to have this extension installed.

About how to do that, check the premade demo bundles on
[demo maps](https://github.com/dimitrov-adrian/directus-extension-svgmap-picker-interface/blob/main/demo%20maps). Every
of these is ready to be placed in your `./extensions/interfaces`

## Example

**Selector:** `.choice`

**SVG:**

```xml
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
			stroke: black;
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

</svg>
```
