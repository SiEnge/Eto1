"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
var autoprefixer = require("gulp-autoprefixer");

var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var del = require("del");
var server = require("browser-sync").create();
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var concat = require('gulp-concat');
var rigger = require('gulp-rigger');
var svgSprite = require('gulp-svg-sprite');


gulp.task('svgSprite', function () {
  return gulp.src('source/svg/*.svg') // svg files for sprite
    .pipe(svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg"  //sprite file name
          }
        },
      }
    ))
    .pipe(gulp.dest('source/img'));
});

gulp.task('scripts', function() {
  return gulp.src('source/js/script/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/sienge/js'));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    // .pipe(postcss([
    //   autoprefixer()
    // ]))
    .pipe(gulp.dest("build/sienge/css"))
    .pipe(gulp.dest("source/css"))
    // .pipe(csso())
    // .pipe(rename("style.min.css"))
    // .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/html/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest("build"));
});


// gulp.task("includePhp", function () {
//   return gulp.src("source/*.php")
//       .pipe(rigger())
//       .pipe(gulp.dest("build"));
// });

// gulp.task("includeHtml", function () {
//   return gulp.src("source/*.html")
//       .pipe(rigger())
//       .pipe(gulp.dest("build"));
// });

// gulp.task('include', function () {
//   gulp.src('app/*.js')
//       .pipe(rigger())
//       .pipe(gulp.dest('build/'));
// });

// gulp.task("php", function () {
//   return gulp.src("source/*.php")
//   .pipe(posthtml([
//     include()
//   ]))
//   .pipe(gulp.dest("build"));
// });

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("source/sienge/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("source/img"));
});

// gulp.task("html", function () {
//   return gulp.src("source/*.html")
//   .pipe(gulp.dest("build"));
// });

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/*.js",
    "source/slick/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "refresh"));
  gulp.watch("source/js/script/**/*.js", gulp.series("scripts", "refresh"));
  gulp.watch("source/js/script/*.js", gulp.series("scripts", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("copy", "refresh"));
  gulp.watch("source/html/*.html", gulp.series("html", "refresh"));
  // gulp.watch("source/*.php", gulp.series("php", "refresh"));
  // gulp.watch("source/*.php", gulp.series("includePhp", "refresh")); // отключено 11-01-2020
  // gulp.watch("source/*.html", gulp.series("includeHtml", "refresh"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "scripts",
  // "php",
  // "includePhp"
  "html",
  // "includeHtml"
));

gulp.task("start", gulp.series("build", "server"));

