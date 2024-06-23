import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [ vue(),],
  base: './',
  define:{
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  build:{
    minify:'terser',
    terserOptions:{
      compress:{
        drop_console:true,
        drop_debugger:true,
      }
    }
  }
});
