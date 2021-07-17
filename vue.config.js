const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' // /my-pwa/
    : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Mi GPS Personal'
    },
    404: {
      entry: 'src/main.js',
      template: "public/index.html",
      filename: "404.html",
      title: 'Mi GPS Personal'
    },
  },
  pwa: {
    name: 'Mi GPS Personal',
    themeColor: '#088C2F',
    workboxPluginMode: "InjectManifest", // GenerateSW
    workboxOptions: {
      swSrc: "./src/service-worker.js"
    },
    manifestOptions: {
      background_color: "#088C2F"
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
};

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
        patterns: [
            path.resolve(__dirname, './src/assets/scss/*.scss'),
        ],
    })
}

// CONFIGURACION PARA USO DE SASS. VER:
// https://cli.vuejs.org/guide/css.html#automatic-imports
// IMPORTANTE PARA QUE FUNCIONE LA IMPORTACION Y COMPILACION DE SASS DEBE ESTAR INSTALADA LA VERSION sass-loader": "^10.2.0", ES DECIR: npm i -D sass-loader@10.2.0
