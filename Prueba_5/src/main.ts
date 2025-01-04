interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const cartasBase: InfoCarta[] = [
  {
    idFoto: 1,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },
  {
    idFoto: 2,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
  },
  {
    idFoto: 3,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
  },
];


const cartas: InfoCarta[] = [...cartasBase, ...cartasBase].sort(() => Math.random() - 0.5);


const contenedor = document.getElementById("contenedor-cartas");

if (contenedor instanceof HTMLDivElement) {
  
  cartas.forEach((carta, indice) => {
    const divCarta = document.createElement("div");
    divCarta.className = "carta";
    divCarta.setAttribute("data-indice-id", indice.toString());

    const imagen = document.createElement("img");
    imagen.src = carta.imagen;
    imagen.setAttribute("data-indice-id", indice.toString());

    
    divCarta.appendChild(imagen);

    
    divCarta.addEventListener("click", () => {
      if (!divCarta.classList.contains("revelada")) {
        divCarta.classList.add("revelada");
      }
    });

    
    contenedor.appendChild(divCarta);
  });
} else {
  console.error("El contenedor de cartas no existe o no es un div válido.");
}
