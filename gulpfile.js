var gulp = require("gulp"),
    sass = require('gulp-ruby-sass'),
    typescript = require("gulp-typescript"),
    sourcemaps = require('gulp-sourcemaps'),
    styledocco = require('gulp-styledocco'),
    autoprefixer = require('gulp-autoprefixer'),
    ejs = require("gulp-ejs"),
    browser = require("browser-sync"),
    webpack = require('webpack');

//server
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./",
            open: false
        }
    });
});

//差分コンパイルのために事前にプロジェクト作成
var typescriptProject = typescript.createProject({
    target: "ES5",                              //ECMAScriptのターゲットバージョン
    removeComments: true,                       //コメントの削除
    sortOutput: true,                           //複数のファイルを連結する際に参照関係をもとにソート
    out: "app.js"                       //出力対象のファイル
});

//typescript
gulp.task("typescript",function(){
  gulp.src(["./src/ts/_all.ts"])
    .pipe(sourcemaps.init())
    .pipe(typescript(typescriptProject))    // プロジェクトを渡す事で差分コンパイル
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/js/"))       //指定ディレクトリにJS出力
    .pipe(browser.reload({stream: true}));
});

//sass
gulp.task('style', function() {
    return sass('scss/',{
      style: 'expanded',
      compass: true,
      sourcemap: true
    })
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(browser.reload({stream:true}));
});

//ejs
gulp.task('ejs',function(){
  gulp.src(
    ['projects/ejs/**/*.ejs','!' + 'projects/ejs/**/_*.ejs']
  )
  .pipe(ejs())
  .pipe(gulp.dest('projects/public'))
});

//styledocco
gulp.task('styledocco',function(){
  gulp.src('styleguide/',function(){
    return sass('styleguide/scss/',{
      style: 'expanded',
      compass: true,
      sourcemap: true
    })
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('styleguide/css/'))
    .pipe(styledocco({
      out: 'styleguide/',
      // include: ['bootstrap/css/bootstrap.css'],
      name: 'GuideLine'
    }))
  });
});

// watch
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['style']);
    gulp.watch('src/ts/**/*.ts',['typescript']);
    gulp.watch('styleguide/scss/**/*.scss', ['styledocco']);
    gulp.watch("./public/*.html").on("change", browser.reload);
});

gulp.task('default',['server','watch']);
