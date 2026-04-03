import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const base = process.env.BASE_PATH ? `/${process.env.BASE_PATH}/` : '/';

export default defineConfig({
    plugins: [svelte()],
    base,
});
