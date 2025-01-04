import { Tablero } from "./modelo";
import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
  esPartidaCompleta,
} from "./motor";

// Inicializar la UI
export const inicializarUI = (tablero: Tablero, idContenedor: string, idIntentos: string): void => {
  const contenedorJuego = document.getElementById(idContenedor);
  const intentos = document.getElementById(idIntentos);

  if (!contenedorJuego) {
    throw new Error(`No se encontró el contenedor con id: ${idContenedor}`);
  }
  if (!intentos) {
    throw new Error(`No se encontró el contador con id: ${idIntentos}`);
  }

  const actualizarContador = (intentosCount: number): void => {
    intentos.textContent = `Intentos: ${intentosCount}`;
  };

  const crearElementoCarta = (indice: number): HTMLElement => {
    const carta = tablero.cartas[indice];
    const cartaElemento = document.createElement("div");
    cartaElemento.className = "card";

    if (carta.estaVuelta || carta.encontrada) {
      cartaElemento.innerHTML = `<img src="${carta.imagen}" alt="Carta">`;
      cartaElemento.classList.add("flipped");
    } else {
      cartaElemento.style.backgroundColor = "#007BFF";
    }

    cartaElemento.addEventListener("click", () => manejarClickCarta(indice));

    return cartaElemento;
  };

  const manejarClickCarta = (indice: number): void => {
    if (sePuedeVoltearLaCarta(tablero, indice)) {
      voltearLaCarta(tablero, indice);
      renderizar(tablero, contenedorJuego);

      const { indiceCartaVolteadaA, indiceCartaVolteadaB } = tablero;

      if (indiceCartaVolteadaA !== undefined && indiceCartaVolteadaB !== undefined) {
        gestionarCartasVolteadas(indiceCartaVolteadaA, indiceCartaVolteadaB, contenedorJuego);
      }
    }
  };

  const gestionarCartasVolteadas = (indiceA: number, indiceB: number, contenedorJuego: HTMLElement): void => {
    incrementarIntentos(intentos);

    if (sonPareja(indiceA, indiceB, tablero)) {
      parejaEncontrada(tablero, indiceA, indiceB);
      renderizar(tablero, contenedorJuego);

      if (esPartidaCompleta(tablero)) {
        alert("¡Has ganado!");
      }
    } else {
      parejaNoEncontrada(tablero, indiceA, indiceB, () => renderizar(tablero, contenedorJuego));
    }
  };

  const incrementarIntentos = (intentos: HTMLElement): void => {
    const intentosActuales = parseInt(intentos.textContent?.split(": ")[1] || "0");
    actualizarContador(intentosActuales + 1);
  };

  const renderizar = (tablero: Tablero, contenedorJuego: HTMLElement): void => {
    contenedorJuego.innerHTML = "";

    tablero.cartas.forEach((_, indice) => {
      const cartaElemento = crearElementoCarta(indice);
      contenedorJuego.appendChild(cartaElemento);
    });
  };


  actualizarContador(0);
  renderizar(tablero, contenedorJuego);
};