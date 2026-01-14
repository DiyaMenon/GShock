import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
      // 1. DEPLOYMENT FIX: This prevents the MIME/White Screen error
      base: '/', 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        },
        // 2. LOCALHOST FIX: Update port to 10000 (Your backend port)
        ...(mode === 'development' && {
          proxy: {
            '/api': {
              target: 'http://localhost:10000', // Changed from 5001 to 10000
              changeOrigin: true,
              secure: false,
            },
          },
        }),
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      // 3. BUILD FIX: Ensure output goes to the folder Vercel expects
      build: {
        outDir: 'dist',
      }
    };
});