// Obtener las cartas
const card1 = document.getElementById("carta1");
const card2 = document.getElementById("carta2");

// Variable para controlar si la primera carta ya fue girada
let isFirstCardFlipped = false;
let isFlipping = false; // Controla si se está realizando una animación

// Función para girar una carta
const flipCard = (card: HTMLElement | null): void => {
  if (card && card instanceof HTMLElement) {
    card.classList.add("flipped");
  }
};

// Función para reiniciar todas las cartas
const resetCards = (): void => {
  const cards = document.querySelectorAll(".carta");
  cards.forEach((card) => card.classList.remove("flipped"));
  isFlipping = false; // Permitir nuevos clics después de la animación
};

// Configurar eventos para las cartas
if (card1 instanceof HTMLElement) {
  card1.addEventListener("click", () => {
    if (!isFirstCardFlipped && !isFlipping) {
      flipCard(card1);
      isFirstCardFlipped = true; // Marcar que la primera carta fue girada
    }
  });
}

if (card2 instanceof HTMLElement) {
  card2.addEventListener("click", () => {
    if (isFirstCardFlipped && !isFlipping) {
      flipCard(card2); // Girar la segunda carta
      isFlipping = true; // Deshabilitar clics durante la animación
      setTimeout(() => {
        resetCards(); // Reiniciar todas las cartas tras 1 segundo
      }, 1000); // 1 segundo es el tiempo de la animación
      isFirstCardFlipped = false; // Resetear el estado
    }
  });
}
