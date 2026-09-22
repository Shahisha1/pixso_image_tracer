// Perfect Image Tracer for Pixso
// Main thread: exports the selected Pixso node, sends pixels to the UI,
// and imports the traced SVG back as editable vector layers.

pixso.showUI(__html__, {
  title: 'Perfect Image Tracer',
  width: 380,
  height: 720,
  enableResize: true,
  minWidth: 340,
  minHeight: 560
});

function send(type, payload) {
  pixso.ui.postMessage(Object.assign({ type }, payload || {}));
}

pixso.ui.onmessage = async (msg) => {
  try {
    if (!msg || !msg.type) return;

    if (msg.type === 'startTrace') {
      const selection = pixso.currentPage.selection;
      if (!selection || selection.length !== 1) {
        send('error', { message: 'Select exactly one image or image layer before tracing.' });
        return;
      }

      const sourceNode = selection[0];
      if (typeof sourceNode.exportAsync !== 'function') {
        send('error', { message: 'The selected layer cannot be exported as an image.' });
        return;
      }

      send('progress', { value: 10, message: 'Exporting selected layer…' });
      const imageBytes = await sourceNode.exportAsync({ format: 'PNG' });

      send('processImage', {
        imageData: Array.from(imageBytes),
        options: msg.options || {},
        source: {
          id: sourceNode.id,
          name: sourceNode.name || 'Image',
          x: Number(sourceNode.x) || 0,
          y: Number(sourceNode.y) || 0,
          width: Number(sourceNode.width) || 0,
          height: Number(sourceNode.height) || 0
        }
      });
      return;
    }

    if (msg.type === 'createSvg') {
      if (!msg.svgData || typeof msg.svgData !== 'string') {
        throw new Error('Tracing returned no SVG data.');
      }

      send('progress', { value: 90, message: 'Creating editable vectors…' });
      const vectorFrame = pixso.createNodeFromSvg(msg.svgData);
      vectorFrame.name = `${(msg.source && msg.source.name) || 'Image'} — Traced`;

      if (msg.source) {
        vectorFrame.x = Number(msg.source.x) || 0;
        vectorFrame.y = Number(msg.source.y) || 0;
      }

      pixso.currentPage.selection = [vectorFrame];
      pixso.viewport.scrollAndZoomIntoView([vectorFrame]);
      if (typeof pixso.commitUndo === 'function') pixso.commitUndo();

      send('success', {
        message: 'Tracing complete. The imported SVG is editable in Pixso.',
        pathCount: Number(msg.pathCount) || 0,
        colorCount: Number(msg.colorCount) || 0
      });
      return;
    }

    if (msg.type === 'close') {
      pixso.closePlugin();
    }
  } catch (error) {
    send('error', { message: error && error.message ? error.message : String(error) });
  }
};