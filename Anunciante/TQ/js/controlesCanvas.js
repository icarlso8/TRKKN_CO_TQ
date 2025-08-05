
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

export function agregarThumbnail(canvas, galeriaId) {
  canvas.discardActiveObject().renderAll();
  const dataURL = canvas.toDataURL({ format: "png" });

  const galeria = document.getElementById(galeriaId);
  if (!galeria) return;

  const thumb = document.createElement("div");
  thumb.style.position = "relative";

  const img = document.createElement("img");
  img.src = dataURL;
  img.className = "thumbnail-preview";

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "✖";
  btnEliminar.style.position = "absolute";
  btnEliminar.style.top = "-6px";
  btnEliminar.style.right = "-6px";
  btnEliminar.style.padding = "2px 6px";
  btnEliminar.style.border = "none";
  btnEliminar.style.borderRadius = "50%";
  btnEliminar.style.backgroundColor = "#f44336";
  btnEliminar.style.color = "white";
  btnEliminar.style.cursor = "pointer";
  btnEliminar.style.fontSize = "12px";
  btnEliminar.title = "Eliminar miniatura";
  btnEliminar.onclick = () => thumb.remove();

export async function mostrarGaleriaLogos(canvas) {
  const contenedor = document.getElementById("galeriaLogos");
  contenedor.innerHTML = ""; // Limpiar antes de renderizar
  
  const response = await fetch("../../Anunciante/TQ/json/logos.json");
  const logos = await response.json();
  
  logos.forEach(logo => {
    const img = document.createElement("img");
    img.src = "../../assets/logos/" + logo.nombreArchivo;
    img.title = logo.nombre;
    img.style.width = "80px";
    img.style.cursor = "pointer";
    img.style.border = "1px solid #ccc";
    img.style.borderRadius = "4px";
    img.onclick = () => {
      fabric.Image.fromURL(img.src, function(fabImg) {
        fabImg.scaleToWidth(100);
        fabImg.set({ left: 20, top: 20, hasBorders: true, hasControls: true });
        canvas.add(fabImg).setActiveObject(fabImg);
      });
      document.getElementById("modalLogos").style.display = "none";
    };
  
    contenedor.appendChild(img);
  });
  
  document.getElementById("modalLogos").style.display = "flex";
}

  thumb.appendChild(img);
  thumb.appendChild(btnEliminar);
  galeria.appendChild(thumb);
}
