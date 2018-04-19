const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');

gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('serve',['sass'], function(){
    browserSync({
        server: 'src'  // W jakim folderze mam szukac plików do przełądowania 
    });
    
    gulp.watch('src/*.html', ['reload']); // nasłuchuje zmiany w pliku html gdy coś                                             //znajdzie odpala zdarzenie reload
    gulp.watch('src/sass/*/*.scss' ,['sass']);
    gulp.watch('src/sass/style.scss' ,['sass']);
});

gulp.task('sass', function(){
    return gulp.src('src/sass/style.scss')   // wszytskie pliki z rozszezenie scss wez
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError)) // sprawdź czy nie ma z nim problemów
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('src/css'))              // zapisz je zamieniona na css w pliku css
    .pipe(browserSync.stream());             // refresh browser
});


gulp.task('default', ['serve']);