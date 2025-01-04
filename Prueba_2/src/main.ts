const carta = document.getElementById("carta");
const imagen = document.getElementById("imagen");

if (carta instanceof HTMLDivElement && imagen instanceof HTMLImageElement) {
  carta.addEventListener("click", () => {
    // Alternar la clase "volteada" para cambiar entre azul liso e imagen
    carta.classList.toggle("volteada");
  });
} else {
  console.error("El elemento carta o la imagen no se encontraron en el DOM.");
}
