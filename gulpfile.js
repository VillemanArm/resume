const { src, dest, watch, series, parallel } = require('gulp'); // подключение методов GULP
const browserSync = require('browser-sync').create(); //создание экземпляра сервера
const isProd = process.argv.includes("--production");
const isDev = !isProd;

// Плагины
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const shorthand = require('gulp-shorthand');
const groupCssMediaQueries = require('gulp-group-css-media-queries');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webp = require('gulp-webp');
const webpHtml = require("gulp-webp-html");
const webpCss = require("gulp-webp-css-fixed");
const fonter = require("gulp-fonter-2");

//Задачи

const htmlTask = () => { // задача (обычная js функция)
    return src("./src/index.html") // чтение данных для обработки
    .pipe(plumber({ // замена стандартного обработчика ошибок
        errorHandler: notify.onError(error => ({
            title: 'HTML',
            message: error.message
        }))
    }))
    .pipe(webpHtml())
    .pipe(htmlmin({          // любое количество плагинов
        collapseWhitespace: true,
    })) 
    .pipe(dest("./dist")) // запись данных после обработки
    .pipe(browserSync.stream()); //изменение отображения без перезагрузки страницы

}

const fontsTask = () => { 
    return src("./src/fonts/**/*.*") //{ttf, woff, eot, svg}
    .pipe(newer("./dist/fonts/"))
    // .pipe(fonter({ //конвертер форматов eot, svg. Не передавать в него ничего другого!
    //     formats: ["ttf", "woff", "eot", "svg"]
    // }))
    .pipe(dest("./dist/fonts")) 
    .pipe(browserSync.stream()); 

}

const transferingTask = () => { 
    return src("./src/**/*.*")
    .pipe(newer("./dist/"))
    .pipe(dest("./dist/")) 
    .pipe(browserSync.stream()); 

}

const sassTask = () => { 
return src("./src/css/*.{sass, scss}", {sourcemaps: isDev}) 
    .pipe(plumber({ 
        errorHandler: notify.onError(error => ({
            title: 'SASS',
            message: error.message
        }))
    }))

    .pipe(sass()) // преобразование sass в css
    .pipe(concat("style.css"))
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(shorthand()) // сокращение свойств, которые можно сократить
    .pipe(groupCssMediaQueries()) // сборка одинаковых медиа запросов в одно место
    .pipe(csso()) // минификация файла
    .pipe(dest("./dist/css/", {sourcemaps: isDev})) 
    .pipe(browserSync.stream()); 

}

const jsTask = () => { 
    return src("./src/js/*.js", {sourcemaps: isDev}) 
        .pipe(plumber({ 
            errorHandler: notify.onError(error => ({
                title: 'JavaScript',
                message: error.message
            }))
        }))
        .pipe(babel()) // перевод на ES5 для старых браузеров
        .pipe(uglify()) // минификатор js
        .pipe(dest("./dist/js/", {sourcemaps: isDev})) 
        .pipe(browserSync.stream()); 
    }

const imgTask = () => { 
    return src("./src/img/**/*.*") 
        .pipe(plumber({ 
            errorHandler: notify.onError(error => ({
                title: 'Images',
                message: error.message
            }))
        }))
        .pipe(newer("./dist/img/")) // обновление только необработанных картинок
        .pipe(webp()) // конвертация картинок в webp
        .pipe(dest("./dist/img/")) // запись картинок в webp
        .pipe(src("./src/img/**/*.*")) 
        .pipe(newer("./dist/img/"))
        .pipe(imagemin({ // минификация картинок
            verbose: true
        }))
        .pipe(dest("./dist/img/")) 
        .pipe(browserSync.stream()); 
    }

// наблюдение
const watcher = (cb) => {
    if (isDev) {
        watch("./src/**/*.html", htmlTask).on("all", browserSync.reload); // ожидание изменений в фоновом режиме
        watch("./src/css/**/*.sass", sassTask).on("all", browserSync.reload);
        watch("./src/js/**/*.js", jsTask).on("all", browserSync.reload);
        watch("./src/img/**/*.*", imgTask).on("all", browserSync.reload);
        watch("./src/fonts/**/*.*", fontsTask).on("all", browserSync.reload);
    }
    cb()
}

// Удаление директории сборки для ее обновления
const clear = (cb) => {
    if (isProd) {
        return src("./dist", {read: false, allowEmpty: true})
        .pipe(clean())
    }
    cb()
}

// Сервер
const server = (cb) => {
    if (isDev) {
        browserSync.init({
            server: {
                baseDir: "./dist"
            },
        });
    }
    cb()
}

exports.htmlTask = htmlTask; //экспорт задачи
module.exports.watch = watcher; //экспорт задачи в другие модули
exports.clear = clear;
exports.sassTask = sassTask
exports.jsTask = jsTask
exports.imgTask = imgTask
exports.fontsTask = fontsTask
exports.transferingTask = transferingTask


// флаг --production запускает режим финальной сборки проекта
exports.default = series(   // последовательный список задач для всей сборки
    clear,
    htmlTask,
    sassTask,
    jsTask, 
    imgTask,
    fontsTask,
    transferingTask,
    parallel(watcher, server) // список задач, выполняемых параллельно
    )