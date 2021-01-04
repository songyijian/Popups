const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const { name, version, author, repository} = require('../package')
const postcss = require('rollup-plugin-postcss');
const sass = require('node-sass');
// import scss from 'rollup-plugin-scss'

const resolveFile = (...dir)=> path.join(__dirname, `../`, ...dir)
const moduleName = 'Popups'


const banner =
  `${'/*!\n' + ' * '}${name} v${version}\n` +
  ` * repository ${repository.url}\n` +
  ` * (c) 2017-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the MIT License.\n` +
  ` */`;



const processSass = function(context, payload) {
  return new Promise(( resolve, reject ) => {
    sass.render({
      file: context
    }, function(err, result) {
      if( !err ) {
        resolve(result);
      } else {
        reject(err)
      }
    });
  })
}

const cssconfig = {
  extract: true,
  minimize: process.env.NODE_ENV === 'production',
  extensions:['css', 'scss'],
  process: processSass,
}


const plugins = [
  commonjs(),
  json(),
  resolve(),
  postcss(cssconfig),
  babel({
    babelrc: false,
    presets: [
      ['@babel/preset-env', {
        modules: false
      }]
    ],
    plugins: [
      ["@babel/plugin-transform-classes", {
        "loose": true
      }]
    ]
  }),
]


module.exports = [
  {
    input: resolveFile('./src/index.js'),
    output: [{
      file: resolveFile(`dist/index.js`),
      format: 'cjs',
      banner,
    }],
    plugins
  },
  {
    input: resolveFile('./src/index.js'),
    output: [{
      file: resolveFile(`dist/${name}.umd.js`),
      name: moduleName,
      format: 'umd',
      banner,
    }],
    plugins
  },
  // {
  //   input: resolveFile('./src/index.js'),
  //   output: [{
  //     file: resolveFile(`dist/${name}.iife.js`),
  //     name: moduleName,
  //     format: 'iife',
  //     banner,
  //   }],
  //   plugins
  // },
  // {
  //   input: resolveFile('./src/index.js'),
  //   output: [{
  //     file: resolveFile(`dist/index.js`),
  //     format: 'es',
  //     banner,
  //   }],
  //   plugins
  // },
]