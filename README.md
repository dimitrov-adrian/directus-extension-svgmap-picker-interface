> This extension is under development, it may take breaking changes.

# SVG Map Picker

Select a value from a SVG Map box

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
3. Set selector to the desired elements
4. Put your SVG image as a XML document in the SVG field

## FAQ

### What SVG I can use?

You can use whatever SVGs you like, it is just necessery to have proper selection (such as class) and have `value` or
`data-value` attributes on wanted elements.

### Can I use hover/active custom styles in place of the colors of picker?

Yes, just use `:hover` pseudo class for hovering effect and `.active` class name for current selected item.

### What is the value source order?

Selected element emits first matched attribute in order `value`, `data-value` and `id`

### Extending the extension???

If you want to reuse your custom map across multiple project and do not want to fill the SVG document multiple times,
you could reuse the extension and pack with your custom map. Place it in your
`./extensions/interfaces/YourCustomMapPicker/index.js`

Take a look at
[example bundle](https://github.com/dimitrov-adrian/directus-extension-svgmap-picker-interface/blob/main/reusables/example/index.js)
