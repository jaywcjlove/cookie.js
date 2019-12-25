const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const banner = require('bannerjs');
const zlib = require('zlib');
require('colors-cli/toxic');

// see below for details on the options
const inputOptions = {
  input: 'src/main.js',
  plugins: [
    nodeResolve(),
    commonjs(), // so Rollup can convert `ms` to an ES module
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
    }),
  ],
};

(async () => {
  const bundle = await rollup.rollup(inputOptions);
  const umd = await bundle.write({
    file: 'dist/cookie.js',
    format: 'umd',
    name: 'cookie',
    banner: banner.multibanner(),
  });
  report(umd, 'dist/cookie.js');

  const iife = await bundle.write({
    file: 'dist/cookie.min.js',
    name: 'cookie',
    banner: banner.onebanner(),
    format: 'iife',
    plugins: [terser()]
  });
  report(iife, 'dist/cookie.min.js');

  const esm = await bundle.write({
    file: 'dist/cookie.esm.js',
    format: 'esm',
    name: 'cookie',
    banner: banner.multibanner(),
  });
  report(esm, 'dist/cookie.esm.js');

  const cjs = await bundle.write({
    file: 'dist/cookie.cjs.js',
    format: 'cjs',
    name: 'cookie',
    banner: banner.multibanner(),
  });
  report(cjs, 'dist/cookie.cjs.js');

})();

function report(result, outpath, extra) {
  const code = result.output[0].code;
  zlib.gzip(code, (_err, zipped) => {
    if (_err) return reject(_err);
    extra = `(gzipped: ${getSize(zipped).green_bt})`;
    console.log(`${(outpath).blue_bt} ${getSize(code).green_bt + (extra || '')}`);
  });
}

function getSize(code) {
  return `${(code.length / 1024).toFixed(2)}kb`;
}
