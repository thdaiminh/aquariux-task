import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(
    {
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]],
      },
    }
  ), viteTsconfigPaths(), tailwindcss()],
  server: {
    port: 8080
  }
})
