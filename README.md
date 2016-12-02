# Avine CV

##My Curriculum Vitae

- To build the website in the `dist/` directory, run both:
  - `npm install`
  - `npm run build`

- To browse locally, run `npm run server` and go to one of the locations:
  - `/dist/index.html` for the **dev** environment (available debugging of .css and .js using sourcemaps)
  - `/dist/bundle.html` for the **prod** environment (compressed version)

- To browse remotely, feel free to visit my website at: http://avine.fr/.

##About the package.json scripts

###Create `dist` folder structure

```javascript
"folder:clean": "shx rm -rf dist/",
"folder:build": "shx mkdir -p dist/css dist/js dist/bundle && shx cp -r src/** dist/",
"folder": "npm run folder:clean -s && npm run folder:build -s"
```

###Move `css` plugins

```javascript
"plugins:fa": "shx mkdir dist/css/font-awesome && shx cp -r node_modules/font-awesome/css/ node_modules/font-awesome/fonts/ dist/css/font-awesome/",
"plugins": "npm run plugins:fa -s"
```

###Compile `less` to `css`

```javascript
"css": "lessc --autoprefix --source-map dist/app/less/app.less dist/app/less/app.css",
"postcss": "cleancss --source-map dist/app/less/app.css -o dist/css/app.min.css"
```

###Transpile `js`

```javascript
"js": "browserify dist/app/js/app.js -t [ babelify ] -d | exorcist dist/js/app.js.map > dist/js/app.js",
"postjs": "uglifyjs dist/js/app.js -m -o dist/js/app.min.js --in-source-map dist/js/app.js.map --source-map dist/js/app.min.js.map --source-map-url app.min.js.map --source-map-root app/js"
```

###Build development environment

```javascript
"dev": "npm run folder -s && npm run plugins -s && npm run css -s && npm run js -s"
```

###Bundle `css`

```javascript
"preprod:css": "shx mkdir dist/tmp/",
"_tmp:fa": "cleancss dist/css/font-awesome/css/font-awesome.min.css -o dist/tmp/1.css",
"_tmp:app": "cleancss dist/css/app.min.css -o dist/tmp/2.css",
"prod:css": "npm run _tmp:fa -s && npm run _tmp:app -s",
"postprod:css": "shx cat dist/tmp/*.css | cleancss -o dist/bundle/bundle.min.css --s0"
```

###Bundle `js`

```javascript
"prod:js": "uglifyjs dist/js/app.min.js -o dist/bundle/bundle.min.js"
```

###Build production environment

```javascript
"prod": "npm run prod:css -s && npm run prod:js -s"
```

###Build all and browse on local server

```javascript
"build": "npm run dev -s && npm run prod -s",
"server": "http-server ./dist/ -o"
```
