import { beforeEach, describe, expect, it } from 'vitest';
import { Tablero, Carta } from './modelo';
import {
  barajarCartas,
  reiniciarEstadoCartas,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
  esPartidaCompleta,
  iniciaPartida,
} from './motor';

describe('Motor de juego', () => {
  
  let tablero: Tablero;


  beforeEach(() => {
    tablero = {
      cartas: [
        { idFoto: 1, imagen: 'img1.png', estaVuelta: false, encontrada: false },
        { idFoto: 1, imagen: 'img1.png', estaVuelta: false, encontrada: false },
        { idFoto: 2, imagen: 'img2.png', estaVuelta: false, encontrada: false },
        { idFoto: 2, imagen: 'img2.png', estaVuelta: false, encontrada: false },
      ],
      estadoPartida: 'CeroCartasLevantadas',
    };
  });

  it('debe barajar las cartas', () => {
    const cartasIniciales = [...tablero.cartas];
    let cartasBarajadas = barajarCartas(tablero.cartas);
  
    for (let i = 0; i < 10; i++) {
      if (!cartasBarajadas.every((carta, idx) => carta === cartasIniciales[idx])) {
        break;
      }
      cartasBarajadas = barajarCartas(tablero.cartas);
    }
  
    expect(cartasBarajadas).not.toEqual(cartasIniciales);
  });

  it('debe reiniciar el estado de las cartas', () => {

    tablero.cartas[0].estaVuelta = true;
    tablero.cartas[1].encontrada = true;

    
    reiniciarEstadoCartas(tablero.cartas);

    
    expect(tablero.cartas[0].estaVuelta).toBe(false);
    expect(tablero.cartas[1].encontrada).toBe(false);
  });

  it('debe permitir voltear una carta si no está volteada ni encontrada', () => {
    
    const indiceCarta = 0;

    
    const resultado = sePuedeVoltearLaCarta(tablero, indiceCarta);

    
    expect(resultado).toBe(true);
  });

  it('no debe permitir voltear una carta que ya está vuelta o encontrada', () => {
    
    tablero.cartas[0].estaVuelta = true;

    
    const resultado = sePuedeVoltearLaCarta(tablero, 0);

    
    expect(resultado).toBe(false);
  });

  it('debe voltear una carta correctamente', () => {
    
    const indiceCarta = 0;

    
    voltearLaCarta(tablero, indiceCarta);

    
    expect(tablero.cartas[indiceCarta].estaVuelta).toBe(true);
    expect(tablero.estadoPartida).toBe('UnaCartaLevantada');
  });

  it('debe reconocer si dos cartas forman una pareja', () => {
    
    const indiceA = 0;
    const indiceB = 1;

    
    const resultado = sonPareja(indiceA, indiceB, tablero);

    
    expect(resultado).toBe(true);
  });

  it('debe marcar como encontrada una pareja de cartas', () => {
    
    const indiceA = 0;
    const indiceB = 1;

    
    parejaEncontrada(tablero, indiceA, indiceB);

    
    expect(tablero.cartas[indiceA].encontrada).toBe(true);
    expect(tablero.cartas[indiceB].encontrada).toBe(true);
  });

  it("debe voltear las cartas no encontradas después de no hacer pareja", async () => {
    
    const cartas: Carta[] = [
      { idFoto: 1, estaVuelta: true, encontrada: false },
      { idFoto: 2, estaVuelta: true, encontrada: false },
    ];
    const tablero: Tablero = {
      cartas,
      estadoPartida: "DosCartasLevantadas",
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 1,
    };

    
    await new Promise<void>((resolve) =>
      parejaNoEncontrada(tablero, 0, 1, resolve)
    );

    
    expect(tablero.cartas[0].estaVuelta).toBe(false);
    expect(tablero.cartas[1].estaVuelta).toBe(false);
  });

  it('debe determinar si la partida está completa', () => {
    
    tablero.cartas[0].encontrada = true;
    tablero.cartas[1].encontrada = true;
    tablero.cartas[2].encontrada = true;
    tablero.cartas[3].encontrada = true;

    
    const resultado = esPartidaCompleta(tablero);

    
    expect(resultado).toBe(true);
  });

  it('debe reiniciar correctamente la partida', () => {
    
    tablero.cartas[0].estaVuelta = true;
    tablero.cartas[1].encontrada = true;

    
    iniciaPartida(tablero);

    
    expect(tablero.cartas[0].estaVuelta).toBe(false);
    expect(tablero.cartas[0].encontrada).toBe(false);
    expect(tablero.estadoPartida).toBe('CeroCartasLevantadas');
  });
});
