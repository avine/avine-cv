# My Curriculum Vitae - Avine

## Commands shortcuts

1. To build the app locally in a "dev" environment execute `npm run env:dev` which will:
  - build the app in the `dist/` directory
  - start a local server and open your default browser

You'll be able to debug styles and scripts (based on sourcemaps) right from the browser.
You'll also be able to change the source code in the `src/` directory and see the result on the fly.
(by the way, to stop the local server, just press `CTRL+C` in the terminal).

2. To build the app locally in a "prod" environment execute `npm run env:prod`.

## About the package.json scripts

### Make the `dist` folders structure

```javascript
"folder:clean": "shx rm -rf dist/",
"folder:make": "shx mkdir -p dist/css dist/js dist/bundle && shx cp src/*.* dist/ && shx cp -r src/static dist/",
"folder": "npm run folder:clean -s && npm run folder:make -s",
```

### Move `css` plugins

```javascript
"plugins:fa": "shx mkdir dist/css/font-awesome && shx cp -r node_modules/font-awesome/css/ node_modules/font-awesome/fonts/ dist/css/font-awesome/",
"plugins": "npm run plugins:fa -s",
```

### Compile `less` to `css`

```javascript
"css": "lessc --autoprefix --source-map src/less/app.less dist/css/app.css",
"postcss": "cleancss --source-map dist/css/app.css -o dist/css/app.min.css",
```

### Transpile `js` ES6 to ES5

```javascript
"js": "browserify src/js/app.js -t [ babelify ] -d | exorcist dist/js/app.js.map > dist/js/app.js",
"postjs": "uglifyjs dist/js/app.js -m -o dist/js/app.min.js --in-source-map dist/js/app.js.map --source-map filename=dist/js/app.min.js.map,url=app.min.js.map,root=app/js",

```

### Build the "dev" environment

```javascript
"build:dev": "npm run folder -s && npm run plugins -s && npm run css -s && npm run js -s",
```

### Watch files

```javascript
"watch:css": "chokidar \"src/less\" -c \"npm run css && echo $(tput setaf 2)css done$(tput sgr0)\"",
"watch:js": "chokidar \"src/js\" -c \"npm run js && echo $(tput setaf 2)js done$(tput sgr0)\"",
"watch:static": "chokidar \"src/*.*\" \"src/static\" -c \"shx cp -ru src/*.* src/static dist/ && echo $(tput setaf 2)static done$(tput sgr0)\"",
"watch": "concurrently \"npm run watch:css -s\" \"npm run watch:js -s\" \"npm run watch:static -s\"",
```

### Run local server in "dev" environment

```javascript
"server:dev": "browser-sync start --server dist/ --files dist/ --no-notify",
"env:dev": "npm run build:dev -s && concurrently \"npm run watch -s\" \"npm run server:dev -s\"",
```

### Bundle `css` for production

```javascript
"preprod:css": "shx mkdir dist/tmp/",
"_tmp:fa": "cleancss dist/css/font-awesome/css/font-awesome.min.css -o dist/tmp/1.css",
"_tmp:app": "cleancss dist/css/app.min.css -o dist/tmp/2.css",
"prod:css": "npm run _tmp:fa -s && npm run _tmp:app -s",
"postprod:css": "shx cat dist/tmp/*.css | cleancss -o dist/bundle/bundle.min.css --s0 && shx rm -r dist/tmp/",
```

### Bundle `js` for production

```javascript
"prod:js": "uglifyjs dist/js/app.min.js -o dist/bundle/bundle.min.js",
```

### Get the `index.html` for production

```javascript
"prod:index": "node useref.js",
```

### Build the "prod" environment

```javascript
"build:prod": "npm run prod:css -s && npm run prod:js -s && npm run prod:index -s",
"build": "npm run build:dev -s && npm run build:prod -s",
"server:prod": "browser-sync start --server dist/ --no-notify",
"env:prod": "npm run build -s && npm run server:prod -s",
```

![Avine](https://avine.io/cv/static/images/logos/logo-128.png)
