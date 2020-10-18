const gulp = require("gulp");
const concat = require("gulp-concat");
var rename = require("gulp-rename");
const cssmin = require("gulp-cssmin");

var paths = {
  styles: {
    src: "src/**/*.css",
    //   откуда все файлы идут
    dest: "styles/",
    //   куда идут (создается файл на уровне package.json)
  },
  build: {
    dest: "build/",
  },
};

function styles() {
  //   взять src файлы, объединить и положить в dest (папка назначения)
  return gulp
    .src(paths.styles.src)
    .pipe(concat(paths.styles.dest))

    .pipe(
      rename(function (path) {
        path.extname = ".css";
      })
    )

    .pipe(cssmin())
    .pipe(gulp.dest(paths.styles.dest));
  //   dest и есть наша папка добавленная styles
}

function watch() {
  gulp.watch(paths.styles.src, styles);
}

// итоговая сборка
function html() {
  return gulp.src("index.html").pipe(gulp.dest(paths.build.dest));
}

function fonts() {
  return gulp.src("fonts/**.*").pipe(gulp.dest(paths.build.dest + "/fonts"));
}

function css() {
  return gulp.src("styles/**.*").pipe(gulp.dest(paths.build.dest + "/styles"));
}

function js() {
  return gulp.src("dist/**.*").pipe(gulp.dest(paths.build.dest + "/dist"));
}

// отдаем данные в сторонний файл server, первые .. выходим из билка, потом из папки todo, потом заходим в папку server
function move() {
  return gulp
    .src("build/**")
    .pipe(gulp.dest(paths.build.dest + "/../../server/build"));
}

function image() {
  return (
    gulp
      .src("image/**.*")
      // из родительского
      .pipe(gulp.dest(paths.build.dest + "/img"))
  );
  // в папку build
}

var build = gulp.series(gulp.parallel(styles, html, fonts, css, js, image));

exports.styles = styles;
exports.watch = watch;
exports.build = build;
exports.move = move;
// экспорт функции во внешнюю область видимости, чтобы можно было вызывать вместе с объектом
// exports.default = build;
