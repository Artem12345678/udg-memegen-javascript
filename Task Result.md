# Task Result

## Used technologies / Frameworks
I use the following technologies / frameworks in my project:

- JavaScript + jQuery
- My own 'PSD to HTML' Starter Kit (Gulp, Rollup, Babel, SASS, PostCSS)

I chose JavaScript + jQuery just to show you, that I know how to use them :)

## 'PSD to HTML Starter Kit'
I have my own 'PSD to HTML' Starter Kit, that uses a bunch of different technologies and provides a convenient workflow (for me at least :) )

### Basic Modules
Module Name | Reason
--- | ---
[gulp](https://www.npmjs.com/package/gulp) | Tasks runner
[gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins) | Plugins autoload
[gulp-plumber](https://www.npmjs.com/package/gulp-plumber) | Watch mode crash prevention
[gulp-notify](https://www.npmjs.com/package/gulp-notify) | Errors notification
[gulp-pug](https://www.npmjs.com/package/gulp-pug) | PUG template engine
[gulp-sass](https://www.npmjs.com/package/gulp-sass) | SASS preprocessor
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) | Sourcemaps
[gulp-svg-sprites](https://www.npmjs.com/package/gulp-svg-sprites) | SVG sprites
[gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith) | PNG sprites
[merge-stream](https://www.npmjs.com/package/merge-stream) | Used with gulp.spritesmith
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) | Images optimization
[gulp-useref](https://www.npmjs.com/package/gulp-useref) | Third party .css and .js files concatenation and minification
[gulp-if](https://www.npmjs.com/package/gulp-if) | Used with gulp-useref
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) | .js files minification
[gulp-rename](https://www.npmjs.com/package/gulp-rename) | File rename (for .min.* files)
[gulp-postcss](https://www.npmjs.com/package/gulp-postcss) | PostCSS 
[postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env) | PostCSS preset
[css-mqpacker](https://www.npmjs.com/package/css-mqpacker) | PostCSS: packs same CSS media query rules into one
[cssnano](https://www.npmjs.com/package/cssnano) | PostCSS: .css files minification
[gulp-better-rollup](https://www.npmjs.com/package/gulp-better-rollup) | Modules bundling 
[rollup](https://www.npmjs.com/package/rollup) | Modules bundling (core)
[rollup-plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs) | Rollup: CommonJS modules to ES6 modules 
[rollup-plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve) | Rollup: Node resolution algorithm
[rollup-plugin-babel](https://www.npmjs.com/package/rollup-plugin-babel) | Rollup: Babel integration
[@babel/core](https://www.npmjs.com/package/@babel/core) | Babel compiler (core)
[babel-preset-airbnb](https://www.npmjs.com/package/babel-preset-airbnb) | Babel preset
[browser-sync](https://www.npmjs.com/package/browser-sync) | Live CSS Reload & Browser Syncing
[del](https://www.npmjs.com/package/del) | Files and directories deletion

### Style Guidelines
Module Name | Reason
--- | ---
[eslint](https://www.npmjs.com/package/eslint) | .js files linting
[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) | ESLint preset
[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) | Used with eslint-config-airbnb-base
[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) | ESLint: Prettier integration
[eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) | ESLint: run Prettier on --fix
[stylelint](https://www.npmjs.com/package/stylelint) | .css files linting
[stylelint-scss](https://www.npmjs.com/package/stylelint-scss) | Stylelint: .scss files linting
[stylelint-config-standard-scss](https://www.npmjs.com/package/stylelint-scss) | Stylelint preset
[prettier](https://www.npmjs.com/package/prettier) | Prettier (core)
[lint-staged](https://www.npmjs.com/package/lint-staged) | Staged files linting
[husky](https://www.npmjs.com/package/husky) | Used with lint-staged

And also I use BEM (mixed with Bootstrap classes) and SMACSS methodologies (naming and file structure)

## Used 3rd Party Libraries
I use the following 3rd party libraries in my project:

Name | Reason
--- | ---
[Bootstrap](https://getbootstrap.com/) | Simple RWD framework for designing the front end.
[bootstrap-colorpicker](https://www.npmjs.com/package/bootstrap-colorpicker) | jQuery colorpicker plugin for Bootstrap
[jquery](https://www.npmjs.com/package/jquery) | Used with Bootstrap and bootstrap-colorpicker
[popper.js](https://www.npmjs.com/package/popper.js) | Used with Bootstrap and bootstrap-colorpicker
[gif.js](https://www.npmjs.com/package/gif.js) | Get Canvas content as Gif (because you can set "image/jpeg" or "image/png" as mime type in canvas.toDataURL(), but you can't set it as "image/gif")

## Installation / Run
The following components must be installed locally:

- [nodejs](https://nodejs.org/en/) v10.16.0

To run the project locally, enter the following in the command line / bash:

```console
$ git clone https://github.com/Artem12345678/udg-memegen-javascript.git
$ cd udg-memegen-javascript
$ npm install
$ copy gif.js and gif.worker.js files from src/js/ to dist/
$ gulp
```
---