import { Carta, Tablero } from "./modelo";

export const barajarCartas = (cartas: Carta[]): Carta[] =>
  cartas.sort(() => Math.random() - 0.5);

export const reiniciarEstadoCartas = (cartas: Carta[]): void => {
  cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
};

export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  const carta = tablero.cartas[indice];
  return (
    !carta.estaVuelta &&
    !carta.encontrada &&
    tablero.estadoPartida !== "DosCartasLevantadas"
  );
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const carta = tablero.cartas[indice];
  carta.estaVuelta = true;

  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean =>
  tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number,
  callback: () => void
): void => {
  setTimeout(() => {
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].estaVuelta = false;
    tablero.estadoPartida = "CeroCartasLevantadas";
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    callback();
  }, 1000);
};

export const esPartidaCompleta = (tablero: Tablero): boolean =>
  tablero.cartas.every((carta) => carta.encontrada);

export const iniciaPartida = (tablero: Tablero): void => {
  reiniciarEstadoCartas(tablero.cartas);
  tablero.cartas = barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};
