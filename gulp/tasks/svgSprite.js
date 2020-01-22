module.exports = () => {

  const onError = function(err) {                                       // Can't use 'this' keyword with arrow function here
                                                                        // https://stackoverflow.com/questions/31095710/methods-in-es6-objects-using-arrow-functions
    $.lp.notify.onError({
      title: "Error in " + err.plugin,
      message: err.message
    })(err);
    this.emit('end');
  };

  
  $.gulp.task('svgSprite', () => {
    return  $.gulp.src(`${paths.source}/img/svgIcons/*.svg`)                      // When we use {} in arrow function we need to use RETURN word
            .pipe($.lp.plumber({
              errorHandler: onError
            }))     
            .pipe($.lp.svgSprites({
              common: "svgIcon",
              selector: "svgIcon--%f",
              svg: {
                sprite: "svgIcons.svg"
              },
              baseSize: 20,
              cssFile: "../sass/modules/_m-svgIcon.scss",
              preview: false,
              templates: { scss: true },
              svgPath: '../img/%f'                                              // относительно конечного css-файла!
            }))
            .pipe($.gulp.dest(`${paths.source}/img`))
  });

}