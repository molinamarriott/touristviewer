import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/touristviewer/',
  publicDir: 'public',
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    host: true
  }
});