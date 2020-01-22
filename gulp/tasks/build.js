module.exports = () => {

  $.gulp.task('build:dev', $.gulp.series('clean', 'pug:dev', 'useref', 'script:dev', 'font', 'pngSprite', 'svgSprite', 'image:dev', 'sass:dev'));

  
  $.gulp.task('build:prod', $.gulp.series('clean', 'pug:prod', 'useref', 'script:prod', 'font', 'pngSprite', 'svgSprite', 'image:prod', 'sass:prod'));
  
}