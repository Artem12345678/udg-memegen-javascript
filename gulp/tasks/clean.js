module.exports = () => {

  $.gulp.task('clean', () => {
    return $.del([`${paths.build}`])                                   // When we use {} in arrow function we need to use RETURN word
  });
  
}