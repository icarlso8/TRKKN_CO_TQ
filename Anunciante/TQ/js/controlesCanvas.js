
// controlesCanvas.js
export function agregarLogo(canvas) {
  const imageUrl = "../../assets/logos/logo_ejemplo.png"; // Puedes cambiar esto dinámicamente después, Remplazada por "export async function mostrarGaleriaLogos(canvas) {"
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
  const iconUrl = "../../assets/iconos/icono_ejemplo.png"; // Puedes cambiar esto dinámicamente después, Remplazada por "export async function mostrarGaleriaIconos(canvas) {"
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

  thumb.appendChild(img);
  thumb.appendChild(btnEliminar);
  galeria.appendChild(thumb);
}
  
export async function mostrarGaleriaLogos(canvas) {
  const contenedor = document.getElementById("galeriaLogos");
  contenedor.innerHTML = ""; // Limpiar antes de renderizar
  
  const response = await fetch("../../Anunciante/TQ/json/logos.json");
  const logos = await response.json();
  
  logos.forEach(logo => {
    const img = document.createElement("img");
    img.src = "../../Anunciante/TQ/assets/logos/" + logo.nombreArchivo;
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

export async function mostrarGaleriaIconos(canvas) {
  const contenedor = document.getElementById("galeriaIconos");
  contenedor.innerHTML = ""; // Limpiar antes de renderizar

  const response = await fetch("../../Anunciante/TQ/json/icons.json");
  const iconos = await response.json();

  iconos.forEach(icono => {
    const img = document.createElement("img");
    img.src = "../../Anunciante/TQ/assets/icons/" + icono.nombreArchivo;
    img.title = icono.nombre;
    img.style.width = "80px";
    img.style.cursor = "pointer";
    img.style.border = "1px solid #ccc";
    img.style.borderRadius = "4px";
    img.onclick = () => {
      fabric.Image.fromURL(img.src, function(fabImg) {
        fabImg.scaleToWidth(60);
        fabImg.set({ left: 50, top: 50, hasBorders: true, hasControls: true });
        canvas.add(fabImg).setActiveObject(fabImg);
      });
      document.getElementById("modalIconos").style.display = "none";
    };

    contenedor.appendChild(img);
  });

  document.getElementById("modalIconos").style.display = "flex";
}

export async function generarCreatividadesConFondos(canvasOriginal, audienciaId, factorId, opcionId, tamañoId, nombreProducto, callback) {
  const canvasTemp = new fabric.Canvas(null, {
    width: canvasOriginal.width,
    height: canvasOriginal.height
  });

  // Clonar el contenido del canvas original
  canvasOriginal.clone((clon) => {
    clon.getObjects().forEach(obj => canvasTemp.add(obj.clone()));

    // Cargar imagen de fondo
    const fondoUrl = `../../Anunciante/TQ/assets/fondos/${audienciaId}/${factorId}/${opcionId}/${tamañoId}/OmniAdsAI_TQ_${audienciaId}_${opcionId}_${tamañoId}_0001.png`;

    fabric.Image.fromURL(fondoUrl, (fondoImg) => {
      fondoImg.scaleToWidth(canvasTemp.width);
      fondoImg.scaleToHeight(canvasTemp.height);
      canvasTemp.setBackgroundImage(fondoImg, canvasTemp.renderAll.bind(canvasTemp));

      // Render final y generar imagen base64
      setTimeout(() => {
        const dataURL = canvasTemp.toDataURL({ format: "png" });

        const nombreCreatividad = `OmniAdsAI_TQ_${nombreProducto}_${audienciaId}_${factorId}_${opcionId}_${tamañoId}_0001.png`;

        // Callback para agregar a la galería o ZIP
        if (callback) callback(dataURL, nombreCreatividad);
      }, 500);
    }, { crossOrigin: 'anonymous' });
  });
}

