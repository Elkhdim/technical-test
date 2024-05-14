import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config({ path: resolve(__dirname, '.env') });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
