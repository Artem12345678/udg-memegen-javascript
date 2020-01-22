module.exports = () => {

  const reload = (done) => {                                           // Need to use callback to return stream. Otherwise it will run only once
    $.bs.reload();                                                     // https://github.com/gulpjs/gulp/blob/4.0/docs/recipes/minimal-browsersync-setup-with-gulp4.md
    done();                                                            // $.bs.stream() = injection without reload, $.bs.reload() = browser reload
  }

  $.gulp.task('watch', () => {
    $.gulp.watch(`${paths.source}/pug/**/*.pug`, $.gulp.series('pug:dev'));
    $.gulp.watch(`${paths.source}/sass/**/*.scss`, $.gulp.series('sass:dev'));
    $.gulp.watch(`${paths.source}/fonts/**/*.*`, $.gulp.series('font', reload));
    $.gulp.watch(`${paths.source}/img/*.*`, $.gulp.series('image:dev', reload));
    $.gulp.watch(`${paths.source}/img/svgIcons/*.svg`, $.gulp.series('svgSprite', reload));    
    $.gulp.watch(`${paths.source}/img/pngIcons/*.png`, $.gulp.series('pngSprite', reload));    
    $.gulp.watch([`${paths.source}/js/**/*.*`, `!${paths.source}/js/libs/*.*`], $.gulp.series('script:dev', reload));
    $.gulp.watch(`${paths.source}/*.html`, $.gulp.series('useref'));  // Removed reload callback here, because of Pug's reload priority
  });

}