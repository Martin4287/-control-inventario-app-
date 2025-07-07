// --- START OF FILE vite.config.ts ---
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // Importa el plugin

// https://vitejs.dev/config/
export default defineConfig({
  // ** IMPORTANTE: Configura la base para GitHub Pages **
  // Debe ser el nombre de tu repositorio en GitHub, con barras al principio y al final.
  base: '/control-inventario-app/', 

  plugins: [
    react(),
    VitePWA({ // Configura VitePWA
      registerType: 'autoUpdate',
      // Aquí listas los assets que tu PWA debe cachear inmediatamente
      // Asegúrate de que los nombres y rutas de tus iconos y favicon sean correctos
      includeAssets: ['favicon.png', 'icons/*.png', 'apple-touch-icon.png'], 
      manifest: { // Este es el contenido de tu manifest.json generado
        name: 'Control de Inventario Offline',
        short_name: 'Inventario',
        description: 'Aplicación offline para control de stock y registro de retiros.',
        theme_color: '#2dd4bf', // Color que usará el navegador para la barra de dirección/título
        background_color: '#f8f8f8', // Color de fondo al iniciar la app
        display: 'standalone', // Hace que se vea como una app nativa (sin barra de navegador)
        icons: [ // Rutas a tus íconos (deben estar en public/icons/)
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-maskable-192x192.png', // Para íconos adaptativos en Android
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'icons/icon-maskable-512x512.png', // Para íconos adaptativos en Android
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
});
// --- END OF FILE vite.config.ts ---
