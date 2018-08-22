"use strict";
// Connect our dependencies
var gulp = require("gulp"),
    watch = require("gulp-watch"),
    preFixer = require("gulp-autoprefixer"),
    sass = require("gulp-sass"),
    sourceMaps = require("gulp-sourcemaps"),
    cssMin = require("gulp-clean-css"),
    plumber = require("gulp-plumber"),
    rename = require("gulp-rename"),
    rigger = require("gulp-rigger"),
    uglify = require("gulp-uglify"),
    del = require("del");

//Paths

var path = {
    build: {
        html: "build/",
        js: "build/js/",
        jscss: "build/js/",
        css: "build/css/",
        img: "build/img/",
        fonts: "build/fonts/"
    },

    src: {
        html: "src/*.html",
        js: "src/js/*.js",
        jscss: "src/js/*.css",
        style: "src/sass/main.scss",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*"
    },

    watch: {
        html: "src/**/*.html",
        js: "src/js/**/*.js",
        jscss: "src/js/**/*.css",
        style: "src/sass/**/*.scss",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*"
    },

    clean: "./build"
};

gulp.task("html:build", function() {
    return gulp
        .src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

gulp.task("style:build", function() {
    let pipeline = gulp.src(path.src.style);

    if (!process.env.IS_PROD) {
        pipeline.pipe(sourceMaps.init()); // Initiate source mapper
    }

    return pipeline
        .pipe(plumber())
        .pipe(sass()) //Sass compiling
        .pipe(sass().on("error", sass.logError)) //handling sass errors
        .pipe(preFixer({ browsers: ["ie >= 9"] })) //Autoprefix
        .pipe(cssMin({ compatibility: "ie10" })) //Minify code
        .pipe(sourceMaps.write()) // Make sourcemaps
        .pipe(rename("style.css")) //
        .pipe(gulp.dest(path.build.css));
});

gulp.task("js:build", function() {
    return (
        gulp
            .src(path.src.js)
            .pipe(rigger())
            .pipe(sourceMaps.init())
            // .pipe(uglify())
            .pipe(plumber())
            .pipe(sourceMaps.write())
            .pipe(gulp.dest(path.build.js))
    );
});

gulp.task("jscss:build", function() {
    return gulp
        .src(path.src.jscss)
        .pipe(rigger())
        .pipe(sourceMaps.init())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.jscss));
});

gulp.task("image:build", function() {
    return gulp.src(path.src.img).pipe(gulp.dest(path.build.img));
});

gulp.task("fonts:build", function() {
    return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task("clean", function() {
    return del(path.clean);
});

gulp.task("watch", function() {
    gulp.watch(path.watch.html, gulp.series("html:build"));
    gulp.watch(path.watch.style, gulp.series("style:build"));
    gulp.watch(path.watch.js, gulp.series("js:build"));
    gulp.watch(path.watch.jscss, gulp.series("jscss:build"));
    gulp.watch(path.watch.img, gulp.series("image:build"));
    gulp.watch(path.watch.fonts, gulp.series("fonts:build"));
});

gulp.task(
    "build",
    gulp.series(
        "clean",
        gulp.parallel(
            "html:build",
            "style:build",
            "js:build",
            "jscss:build",
            "image:build",
            "fonts:build"
        )
    )
);

gulp.task("default", gulp.series("build", "watch"));
