module.exports = () => {

  const onError = function(err) {                                       // Can't use 'this' keyword with arrow function here
                                                                        // https://stackoverflow.com/questions/31095710/methods-in-es6-objects-using-arrow-functions
    $.lp.notify.onError({
      title: "Error in " + err.plugin,
      message: err.message
    })(err);
    this.emit('end');
  };


  $.gulp.task('pngSprite', () => {
    var spriteData = $.gulp.src(`${paths.source}/img/pngIcons/*.png`)                      // When we use {} in arrow function we need to use RETURN word
                      .pipe($.lp.plumber({
                        errorHandler: onError
                      }))
                      .pipe($.lp.spritesmith({
                        imgName: 'pngIcons.png',
                        imgPath: '../img/pngIcons.png',                                   // относительно конечного css-файла!  
                        cssName: '_m-pngIcon.scss',
                        padding: 10,
                        cssFormat: 'css',
                        algorithm: 'top-down',
                        cssOpts: {
                          cssSelector: function (sprite) {
                            return '.pngIcon.pngIcon--' + sprite.name;
                          }
                        }
                      }));
            
    var spriteImg = spriteData.img.pipe($.gulp.dest(`${paths.source}/img/`)); 
    var spriteCss = spriteData.css.pipe($.gulp.dest(`${paths.source}/sass/modules/`)); 

    return  $.ms(spriteImg, spriteCss);
  });

}