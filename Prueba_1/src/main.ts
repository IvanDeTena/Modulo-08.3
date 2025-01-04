function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

type Carta = { animal: string };

const cartas: Carta[] = [
    { animal: "🦁" }, // León
    { animal: "🦉" }, // Búho
    { animal: "🐕" }, // Perro
    { animal: "🐖" }, // Cerdo
];

const cartasBarajadas = shuffleArray(cartas);
console.log(cartasBarajadas);
