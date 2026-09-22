# Perfect Image Tracer for Pixso

Perfect Image Tracer converts a selected raster or exportable Pixso layer into editable SVG vector artwork.

## Project status

| Area | Implementation |
| --- | --- |
| Runtime | Pixso plugin sandbox + UI iframe |
| Input | One selected exportable Pixso layer |
| Raster export | PNG through exportAsync() |
| Tracing engine | ImageTracerJS 1.2.6 |
| Output | SVG imported as an editable Pixso node |
| Presets | Default, Sharp, Smooth, Detailed, Posterize, Custom |
| Controls | Color sampling, color count, line threshold, quadratic threshold |
| Processing | Right-angle enhancement and optional posterization |
| Feedback | Progress, status, path count and color count |
| License | MIT for this plugin's own code |

## Repository layout

    .
    ├── manifest.json
    ├── main.js
    ├── ui.html
    ├── icon.svg
    ├── package.json
    └── README.md

README.md is the only Markdown documentation file in the repository.

## Runtime architecture

    Selected Pixso layer
            |
            v
         main.js
            |
     exportAsync() as PNG
            v
       PNG byte array
            |
            v
         ui.html
            |
      canvas ImageData
            v
      ImageTracerJS
            |
          SVG
            v
         main.js
            |
      createNodeFromSvg()
            v
      Editable vector node

### Main thread

main.js opens the UI, validates the current selection, exports the selected layer as PNG, transfers the bytes to the UI, receives SVG output, imports the SVG, positions the result, selects it, and reports progress or errors.

### UI thread

ui.html contains the complete plugin interface. It receives PNG bytes, decodes them through a canvas, passes ImageData to ImageTracerJS, receives SVG output, counts paths, and sends the result back to the Pixso sandbox.

## Manifest

The plugin entry points are defined in manifest.json. The main script is main.js and the interface is ui.html. The manifest also exposes the Trace Image command.

For local development, Pixso loads the project through manifest.json. The GitHub repository is the source repository and is not itself the plugin package loaded by Pixso.

## Tracing presets

### Default

Balanced settings for general artwork. Uses 16 colors, sampling 2, line threshold 1, quadratic threshold 1, and right-angle enhancement.

### Sharp

Designed for logos and hard edges. Uses 24 colors, sampling 1, line threshold 1, quadratic threshold 0.1, and right-angle enhancement.

### Smooth

Uses softer tracing parameters with 12 colors, higher thresholds, blur processing, and no right-angle enhancement.

### Detailed

Uses 64 colors, low line and quadratic thresholds, no path omission, and right-angle enhancement. This can create substantially more paths.

### Posterize

Uses four colors and blur processing for reduced-color artwork.

### Custom

Allows the tracing controls to be adjusted manually.

## Controls

### Color sampling

Controls how aggressively the source image is sampled. Lower values preserve more pixel-level information and can increase vector complexity.

### Number of colors

Controls the target color count used by ImageTracerJS. Higher values can preserve more color variation but may generate more paths.

### Line threshold

Controls line detection sensitivity. Lower values can preserve finer boundaries.

### Quadratic threshold

Controls quadratic curve approximation. Lower values can retain more curvature detail at the cost of additional geometry.

### Enhance right angles

Enables right-angle enhancement for artwork where geometric corners should be preserved.

### Posterize output

Enables the reduced-color processing option used by the Posterize workflow.

## Input requirements

The plugin requires exactly one selected layer and that layer must support Pixso image export. If the selection is invalid, the plugin reports an error instead of creating output.

## Output behavior

After tracing, the SVG is imported into Pixso, positioned at the source layer's original coordinates, named using the source layer name followed by "— Traced", selected automatically, and brought into the viewport.

The original source layer is not automatically deleted or replaced.

## Performance

Tracing complexity depends on source dimensions, color count, and tracing thresholds.

- Start with Default or Smooth for large artwork.
- Reduce the color count when the result becomes too complex.
- Use Detailed only when additional geometry is useful.
- Resize extremely large images before tracing.
- Photographs and textured images can produce substantially more paths than flat artwork.

## External runtime dependency

ImageTracerJS 1.2.6 is currently loaded from jsDelivr by ui.html. This keeps the repository lightweight but means the library must be reachable when the plugin UI loads.

A future packaging improvement can vendor ImageTracerJS into the plugin for fully self-contained runtime operation.

## Development

The current runtime does not require an npm dependency installation. The package test command performs a Node syntax check against main.js.

Local testing workflow:

1. Clone or download the repository.
2. Keep manifest.json, main.js, and ui.html together.
3. Open Pixso.
4. Open the plugin development workflow.
5. Load the project through manifest.json.
6. Select one exportable image or design layer.
7. Run Perfect Image Tracer → Trace Image.
8. Test the presets and custom controls.
9. Verify that the generated SVG is editable.

Pixso also provides official CLI tooling for projects that need hot reload, builds, or packaging. This repository currently keeps its runtime directly loadable rather than introducing a bundler.

## Troubleshooting

### No valid layer selected

Select exactly one exportable layer before running the plugin.

### ImageTracerJS failed to load

The current implementation retrieves ImageTracerJS from jsDelivr. Check network access available to the plugin UI and reopen the plugin.

### Too many paths

Reduce the color count, use Default or Smooth, or avoid Detailed.

### Output is too simplified

Increase the color count or use Detailed. Lower thresholds can preserve more geometry but increase output complexity.

### Corners look too harsh

Try Smooth or disable right-angle enhancement in Custom mode.

### No vector appears

Check the plugin status message and Pixso selection. The SVG is created only after ImageTracerJS successfully returns output.

## Versioning

Public releases should update the package version, document behavior changes in this README, refresh Plugin Center screenshots when the UI changes, and include GitHub release notes.

## License

The plugin's own source code is released under the MIT License.

ImageTracerJS is a separate dependency and retains its own license or public-domain dedication. Its licensing should be treated independently from the plugin's MIT license.

## Repository

https://github.com/Shahisha1/pixso_image_tracer
