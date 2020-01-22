module.exports = () => {

  $.gulp.task('font', () => {
    return  $.gulp.src(`${paths.source}/fonts/**/*.*`)                 // When we use {} in arrow function we need to use RETURN word
            .pipe($.gulp.dest(`${paths.build}/fonts`));
  });

}