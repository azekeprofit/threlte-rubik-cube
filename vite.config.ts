import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";

// https://vite.dev/config/
export default defineConfig({
  base: '/threlte-rubik-cube/',
  plugins: [{ ...threeMinifier(), enforce: "pre" },svelte()],
});
