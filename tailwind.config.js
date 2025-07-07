// --- START OF FILE tailwind.config.js ---
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate de que cubra tus archivos React
    "./App.tsx", // Si App.tsx está en la raíz
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
// --- END OF FILE tailwind.config.js ---
