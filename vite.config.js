import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';

export default defineConfig({
  base: isVercel ? '/' : '/MISSION-6/',
  plugins: [react()],
});
