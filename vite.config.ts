import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ai/', // served at pradivya.com/ai/ (IIS folder D:\Pradivya\ai)
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'],
  },
});
