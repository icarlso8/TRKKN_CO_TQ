
// controlesCanvas.js
export function agregarLogo(canvas) {
  const imageUrl = "../../assets/logos/logo_ejemplo.png"; // Puedes cambiar esto dinámicamente después
  fabric.Image.fromURL(imageUrl, function(img) {
    img.scaleToWidth(100);
    img.set({
      left: 20,
      top: 20,
      hasBorders: true,
      hasControls: true
    });
    canvas.add(img).setActiveObject(img);
  });
}

export function agregarIcono(canvas) {
  const iconUrl = "../../assets/iconos/icono_ejemplo.png"; // Puedes cambiar esto dinámicamente después
  fabric.Image.fromURL(iconUrl, function(img) {
    img.scaleToWidth(60);
    img.set({
      left: 50,
      top: 50,
      hasBorders: true,
      hasControls: true
    });
    canvas.add(img).setActiveObject(img);
  });
}

export function agregarTexto(canvas) {
  const text = new fabric.IText("Texto personalizado", {
    left: 80,
    top: 80,
    fontFamily: "Mulish",
    fontSize: 22,
    fill: "#000",
    fontWeight: "bold"
  });
  canvas.add(text).setActiveObject(text);
}

export function limpiarCanvas(canvas) {
  canvas.clear();
  canvas.backgroundColor = "#ffffff";
  canvas.renderAll();
}
