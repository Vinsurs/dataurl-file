import { defineConfig } from "vite";
import { resolve } from "path"
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'dataurlFile',
            // the proper extensions will be added
            fileName: 'dataurl-file',
        },
        rollupOptions: {
            plugins: [typescript({
                declarationDir: "dist",
                declaration: true
            })]
        }
    }
})