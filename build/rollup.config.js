const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
// const uglify = require("rollup-plugin-uglify");
// import { uglify } from "rollup-plugin-uglify";
const package = require('../package');

const resolveFile = function(...dir){return path.join(__dirname,`../`, ...dir)};
const pname = package.name
const moduleName = 'Popups'
const pversion = package.version


const plugins = [
  commonjs(),
  // uglify(),
  json(),
  resolve(),
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }] ],
    plugins: [["@babel/plugin-transform-classes", { "loose": true}] ]
  }),
]


module.exports = [

  {
    input: resolveFile('./src/index.js'),
    output: [
      {
        file: resolveFile(`dist/${pname}.cjs.js`),
        format: 'cjs',
      }
    ], 
    plugins
  },
  {
    input: resolveFile('./src/index.js'),
    output: [
      {
        file: resolveFile(`dist/${pname}.umd.js`),
        name:moduleName,
        format: 'umd',
      }
    ], 
    plugins
  },
  {
    input: resolveFile('./src/index.js'),
    output: [
      {
        file: resolveFile(`dist/${pname}.iife.js`),
        name:moduleName,
        format: 'iife',
      }
    ], 
    plugins
  },
    {
      input: resolveFile('./src/index.js'),
      output: [{
        file: resolveFile(`dist/index.js`),
        format: 'es',
      }],
      plugins
    },
]