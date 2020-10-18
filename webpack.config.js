const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './code.js',
  // откуда экспортируется
  output: {
    path: path.resolve(__dirname, 'dist'),
    // в папку что создаст
    filename: 'index.bundle.js'
    // bundle - собранный код, название, не расширение, признак собранности
  },
  watch: true,
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['../todo'] }
    })
  ]
}