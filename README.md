# Perfect Image Tracer for Pixso

> 🎨 Turn raster artwork into clean, editable vector artwork — directly inside Pixso.

Perfect Image Tracer converts a selected Pixso layer into an editable SVG using **ImageTracerJS**.

## ✨ Features

* 🖼️ Trace raster and image artwork
* ✏️ Generate editable SVG vectors
* 🎛️ 6 built-in tracing presets
* 🎨 Adjustable color and geometry settings
* 📊 Live progress and tracing statistics
* 📍 Keeps the traced artwork aligned with the original
* 🔄 Automatically selects the generated vector

## 🎛️ Presets

| Preset        | Best for                  |
| ------------- | ------------------------- |
| **Default**   | Balanced everyday tracing |
| **Sharp**     | Logos and hard edges      |
| **Smooth**    | Softer artwork            |
| **Detailed**  | More colors and geometry  |
| **Posterize** | Reduced-color artwork     |
| **Custom**    | Manual control            |

Custom mode provides controls for:

* Color sampling
* Number of colors
* Line threshold
* Quadratic threshold
* Right-angle enhancement
* Posterization

## ⚙️ How It Works

```text
Pixso layer
     ↓
Export as PNG
     ↓
ImageTracerJS
     ↓
SVG
     ↓
Editable Pixso vector
```

The plugin processes the image in its UI and sends the generated SVG back to the Pixso plugin sandbox for import.

## 📁 Project Structure

```text
pixso_image_tracer/
├── manifest.json    # Pixso plugin configuration
├── main.js          # Plugin sandbox logic
├── ui.html          # Plugin interface and tracing logic
├── icon.svg         # Plugin icon
├── package.json     # Project metadata
└── README.md        # Documentation
```

## 🚀 Development

1. Clone or download the repository.
2. Open Pixso's plugin development workflow.
3. Load the project using `manifest.json`.
4. Select one exportable layer.
5. Run **Perfect Image Tracer → Trace Image**.
6. Test the presets and custom controls.

No npm dependency installation is currently required for the runtime.

## 🧩 Output

The generated SVG is:

* Imported as an editable Pixso node
* Positioned at the source layer's coordinates
* Named using the source name followed by **— Traced**
* Automatically selected

The original source layer is **not deleted or replaced**.

## ⚡ Tips

* Use **Default** for general artwork.
* Try **Sharp** for logos and geometric designs.
* Use **Smooth** for softer artwork.
* Use **Detailed** when preserving extra geometry is important.
* Reduce the color count if the result becomes too complex.
* Large or highly textured images can generate many paths.

## 🔌 Dependency

The plugin currently uses **ImageTracerJS 1.2.6**, loaded from jsDelivr.

The library therefore needs to be reachable when the plugin UI loads.

## 🛠️ Troubleshooting

**No result?**
Make sure exactly one exportable layer is selected.

**Too many paths?**
Try **Default** or **Smooth**, and reduce the color count.

**Result is too simplified?**
Increase the color count or try **Detailed**.

**Corners look too harsh?**
Use **Smooth** or disable right-angle enhancement in Custom mode.

**ImageTracerJS failed to load?**
Check network access and reopen the plugin.

## 📌 License

The plugin's own source code is released under the **MIT License**.

ImageTracerJS is a separate dependency with its own licensing terms.

## 🔗 Repository

[GitHub — Shahisha1/pixso_image_tracer](https://github.com/Shahisha1/pixso_image_tracer)
