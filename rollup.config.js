// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import postcss from "rollup-plugin-postcss";
import scss from "rollup-plugin-scss";
import replace from "rollup-plugin-replace";

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({tsconfig: "./tsconfig.json"}),
            terser(),
            scss({fileName: 'styles.css'}),
        ],
        external: ["react", "react-dom", "react-router-dom"],
    },
    {
        input: "src/index.ts",
        output: [{file: "dist/index.d.ts", format: "es"}],
        plugins: [dts.default()],
        external: [/\.s?css$/],
    },
    {
        input: "src/demo/demo.tsx",
        output: [
            {
                file: "public/zenux-dashboard-demo.js",
                format: "iife",
                sourcemap: true,
                name: "zenux.dashboard.demo"
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({tsconfig: "./tsconfig.json"}),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
                presets: [['@babel/preset-react', {"runtime": "automatic"}]],
                extensions: ['.js', '.jsx']
            }),
            scss({fileName: 'zenux-dashboard-demo.css'}),
            // terser(),
        ],
        external: [],
    }
];