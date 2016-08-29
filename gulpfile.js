const path = require('path')
const gulp = require('gulp')
const util = require('gulp-util')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackConfigDev = require('./config/webpack.config.dev')
const webpackConfigProd = require('./config/webpack.config.prod')

gulp.task('copy', () => {
  return gulp.src([
    `./index.html`,
    './manifest.json'
    ])
    .pipe(gulp.dest('./build'))
})

gulp.task('assets', () => {
  return gulp.src('./assets/**/*.png')
    .pipe(gulp.dest(`./build/assets`))
})

gulp.task('client:compile', cb => {
  webpack(webpackConfigProd, (err, stats) => {
    if (err) throw new util.PluginError('webpack', err)
    util.log('[webpack]', stats.toString())
    cb()
  })
})

gulp.task('webpack', cb => {
  webpack(webpackConfigProd, (err, stats) => {
    if (err) throw new util.PluginError('webpack', err)
    util.log('[webpack]', stats.toString())
    cb()
  })
})

gulp.task('serve', () => {
  const compiler = webpack(webpackConfigDev)

  const server = new WebpackDevServer(compiler, {
    contentBase: './build',
    hot: true,
    stats: {
      colors: true
    }
  })

  server.listen(8080, 'localhost', err => {
    if (err) throw new util.PluginError('webpack-dev-server', err)
    util.log('[webpack-dev-server]', 'http://localhost:8080')
  })
})

gulp.task('default', ['copy', 'assets', 'serve'])