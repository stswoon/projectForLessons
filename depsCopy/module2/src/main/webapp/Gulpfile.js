"use strict";

let gulp = require('gulp');
let plumber = require("gulp-plumber");
let ngAnnotate = require('gulp-ng-annotate');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
var replace = require('gulp-replace');
let embedTemplates = require('gulp-angular-embed-templates'); //gulp-ng-html2js

/* build task */
gulp.task('js:build', () =>
    gulp.src(["./src/**/*.js"])
        .pipe(plumber({
            errorHandler: onPlumberError
        }))
        .pipe(babel({
            presets: [
                ["es2015", {
                    targets: {
                        chrome: 52,
                        browsers: ["last 2 versions", "safari 8"]
                    }
                }]
            ]
        }))
        .pipe(replace(/((templateUrl:)(\s*)("|'))(.*?)\/components\/((.*?).html)/g, '$1$6'))
        .pipe(embedTemplates())
        // .pipe(embedTemplates({basePath: './js/components/'}))
        // .pipe(ngAnnotate()) // Makes angular safe to minify.
        // .pipe(uglify())
        .pipe(gulp.dest("../../../target/cloud-war/"))
);

//General tasks
gulp.task('default', ["js:build"]);

/*HELPERS*/
process.on('uncaughtException', function (err) {
    console.error(err.message, err.stack, err.errors);
    process.exit(1);
});

gulp.on('err', function (gulpErr) {
    if (gulpErr.err) {
        console.error("Gulp error details", [gulpErr.err.message, gulpErr.err.stack, gulpErr.err.errors].filter(Boolean));
        process.exit(1);
    }
});

function onPlumberError(error) {
    console.log(error);
    this.emit('end');
    process.exit(1);
}