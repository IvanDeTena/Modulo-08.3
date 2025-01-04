import { crearTableroInicial } from "./modelo";
import { iniciaPartida } from "./motor";
import { inicializarUI } from "./ui";

const tablero = crearTableroInicial();
iniciaPartida(tablero);

inicializarUI(tablero, "game-board", "contador-intentos");

const botonReiniciar = document.getElementById("restart-button");
if (botonReiniciar) {
  botonReiniciar.addEventListener("click", () => {
    iniciaPartida(tablero);
    inicializarUI(tablero, "game-board", "contador-intentos");
  });
}
