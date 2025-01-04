import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// Configuración de Vitest directamente en el archivo
export default defineConfig({
  plugins: [checker({ typescript: true })],
  test: {
    environment: 'jsdom',  // Configura jsdom como el entorno de pruebas
    restoreMocks: true,    // Restaurar mocks automáticamente entre pruebas
  },
});
