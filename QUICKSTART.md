# Quick Start

## Install for development

1. Keep `manifest.json`, `main.js`, and `ui.html` in the same folder.
2. Open Pixso and enter the development-plugin workflow from the plugin panel.
3. Load the project using `manifest.json`.

## Trace an image

1. Select exactly one image or exportable layer in Pixso.
2. Run **Perfect Image Tracer → Trace Image**.
3. Pick a preset:
   - **Default** for balanced tracing
   - **Sharp** for logos and hard edges
   - **Smooth** for softer shapes
   - **Detailed** for more retained detail
   - **Posterize** for a reduced-color look
4. Click **Trace Image**.
5. Pixso imports the resulting SVG as editable vector artwork and selects it automatically.

## Troubleshooting

If ImageTracerJS fails to load, check that the plugin iframe has network access and reopen the plugin. If tracing creates too many paths, reduce the color count or avoid the Detailed preset. If no layer is processed, make sure exactly one exportable layer is selected.
