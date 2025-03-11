import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react(), tsconfigPaths()],
    preview: {
        port: 4000,
        strictPort: true,
    },
    server: {
        port: 4000,
        strictPort: true,
        host: true,
        origin: 'http://localhost:4000',
    },
});
