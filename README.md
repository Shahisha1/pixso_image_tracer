# Perfect Image Tracer for Pixso

Perfect Image Tracer is a Pixso plugin that converts a selected raster or exportable design layer into editable SVG vector artwork.

The plugin uses **ImageTracerJS 1.2.6** in the UI iframe for raster-to-vector conversion, then sends the generated SVG back to the Pixso sandbox and imports it with Pixso's `createNodeFromSvg` API.

## Features

- Raster-to-vector tracing inside Pixso
- Five tracing presets: Default, Sharp, Smooth, Detailed, and Posterize
- Adjustable color sampling, color count, line threshold, and quadratic threshold
- Optional right-angle enhancement
- Editable vector output imported as SVG layers
- Progress and path-count feedback
- Works with any selected Pixso layer that can be exported as PNG

## Files

```text
.
├── manifest.json
├── main.js
├── ui.html
├── README.md
├── QUICKSTART.md
├── package.json
└── icon.svg
```

## Repository

[GitHub repository](https://github.com/Shahisha1/pixso_image_tracer)

## Local development installation

1. Download or clone this repository.
2. Open Pixso in the browser.
3. Open the plugin panel and enter the development-plugin workflow.
4. Load the plugin from this project directory using its `manifest.json`.
5. Select one image or exportable layer.
6. Run **Perfect Image Tracer → Trace Image**.
7. Choose a preset or adjust the tracing controls.
8. Click **Trace Image**.

Pixso's current developer documentation recommends the official `@pixso/create-plugin` and `@pixso/plugin-cli` tooling for hot-reload development, but this repository intentionally keeps the runtime files simple and directly loadable.

## How it works

1. `main.js` opens the Pixso UI with `pixso.showUI(__html__)`.
2. The selected layer is exported as PNG bytes with `exportAsync`.
3. The PNG bytes are sent to `ui.html` using Pixso plugin messaging.
4. `ui.html` decodes the PNG into canvas `ImageData`.
5. ImageTracerJS converts that `ImageData` into SVG.
6. The SVG is returned to `main.js`.
7. Pixso imports it with `pixso.createNodeFromSvg`, leaving the result editable.

## ImageTracerJS

This plugin loads ImageTracerJS 1.2.6 from jsDelivr at runtime. ImageTracerJS itself is released under The Unlicense / public domain dedication.

Because the tracing library is loaded from a CDN, the plugin UI needs network access when it is opened. A future release can vendor the ImageTracerJS source into `ui.html` for fully offline operation.

## Limitations

- Tracing quality depends heavily on the source image and selected preset.
- Photographs can generate many paths and may be slow or visually noisy.
- Very large images should be resized before tracing for better performance.
- The plugin has been statically checked here, but final runtime validation must be done inside an actual Pixso editor session.

## Development notes

Pixso UI-to-main messages must be sent through `parent.postMessage({ pluginMessage: ... }, '*')`. Main-to-UI messages are sent with `pixso.ui.postMessage(...)` and are received in the iframe through `event.data.pluginMessage`.

## License

MIT for this plugin's own code. ImageTracerJS is separately distributed under The Unlicense/public domain dedication.
