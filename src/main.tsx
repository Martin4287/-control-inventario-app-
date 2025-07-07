// --- START OF FILE src/main.tsx ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.tsx'; // Importa tu componente App
import './index.css'; // Importa el CSS global para que Tailwind funcione

// No vamos a registrar el Service Worker aquí directamente,
// usaremos un plugin de Vite que lo hace automáticamente (Paso 4).
// Si ya tenías un bloque de registro de Service Worker, bórralo por ahora.

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
// --- END OF FILE src/main.tsx ---
