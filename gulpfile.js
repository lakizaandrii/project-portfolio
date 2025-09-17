const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

// Стили
gulp.task("styles", function () {
    return gulp
        .src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(rename({ suffix: ".min", prefix: "" }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"));
});

// HTML
gulp.task("html", function () {
    return gulp
        .src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

// JS
gulp.task("scripts", function () {
    return gulp
        .src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

// Fonts
gulp.task("fonts", function () {
    return gulp
        .src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

// Icons
gulp.task("icons", function () {
    return gulp
        .src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});

// Images
gulp.task("images", function () {
    return gulp
        .src("src/img/**/*")
        .pipe(gulp.dest("dist/img"));
});

// Главная задача для деплоя
gulp.task(
    "build",
    gulp.parallel("styles", "scripts", "fonts", "icons", "html", "images")
);