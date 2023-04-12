import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import sizes from 'rollup-plugin-sizes';
import * as banner from 'bannerjs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default [
  {
    input: 'src/main.js',
    output: [
      {
        file: 'dist/cookie.cjs.js',
        format: 'cjs',
        name: 'cookie',
        exports: 'auto',
        banner: banner.multibanner(),
      },
      {
        file: pkg.module,
        format: 'es',
        name: 'cookie',
        banner: banner.multibanner(),
      },
    ],
    plugins: [
      json(),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      sizes(),
    ],
  },
  {
    input: 'src/main.js',
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        // format: 'iife',
        name: 'cookie',
        banner: banner.multibanner(),
      },
    ],
    plugins: [
      json(),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      sizes(),
    ],
  },
  {
    input: 'src/main.js',
    output: [
      {
        file: pkg.unpkg.replace(/.js$/, '.min.js'),
        format: 'umd',
        // format: 'iife',
        name: 'cookie',
        banner: banner.onebanner(),
      },
    ],
    plugins: [
      json(),
      nodeResolve({
        browser: true,
      }),
      terser({}),
      commonjs(),
      sizes(),
    ],
  },
];
