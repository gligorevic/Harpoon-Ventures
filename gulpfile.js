var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();

gulp.task("scss", function () {
  return gulp
    .src("app/scss/main.scss")
    .pipe(sass())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task(
  "watch",
  gulp.series("scss", function () {
    browserSync.init({
      server: {
        baseDir: "app",
      },
    });
    gulp.watch("app/scss/**/*.scss", gulp.series("scss"));
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/js/**/*.js", browserSync.reload);
  })
);
