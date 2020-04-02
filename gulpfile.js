const { src, dest, parallel, series } = require('gulp');

const htmlmin = require("gulp-htmlmin");
const validator = require('gulp-html');
const csso = require("gulp-csso");
const autoprefixer = require('gulp-autoprefixer');
const svgmin = require('gulp-svgmin');
const eslint = require('gulp-eslint');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const RevAll = require("gulp-rev-all");
const path = require('path');
const revdel = require('gulp-rev-delete-original');

const html = () => {
    return src('public/**/*.html', { base: "./" })
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            includeAutoGeneratedTags: false,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeScriptTypeAttributes: true,
            useShortDoctype: true
        }))
        .pipe(validator())
        .pipe(dest('./'))
}

const revision = () => {
    const ignore = [
        '.html',
        'sitemap.xml',
        'robots.txt',
        'browserconfig.xml',
        '.php'
    ];

    return src("public/**")
        .pipe(RevAll.revision({
            dontRenameFile: ignore,
            dontUpdateReference: ignore,
            transformFilename: (file, hash) => hash.substr(0, 8) + path.extname(file.path)
        }))
        .pipe(revdel())
        .pipe(dest("public"));
}

const css = () => {
    return src('public/**/*.css', { base: "./" })
        .pipe(csso())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest('./'))
}

const svg = () => {
    return src('public/**/*.svg', { base: "./" })
        .pipe(svgmin({
            plugins: [
                { removeUnknownsAndDefaults: false },
                { collapseGroups: false },
                { cleanupIDs: false }
            ]
        }))
        .pipe(dest('./'))
}

const js = () => {
    return src('public/**/*.js', { base: './' })
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(terser())
        .pipe(dest('./'));
}

const images = () => {
    return src('public/**/*.+(jpeg|jpg|png|gif|JPG|JPEG|PNG|GIF)', { base: "./" })
        .pipe(imagemin())
        .pipe(dest('./'))
}

exports.html = html;
exports.css = css;
exports.svg = svg;
exports.js = js;
exports.images = images;
exports.revision = revision;

exports.default = series(revision, parallel(html, css, svg, images, js));