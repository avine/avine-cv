# My Curriculum Vitae - Avine

This branch uses `webpack` to build the app.

Feel free to check [this version](https://github.com/avine/avine-cv/tree/master) which is based on npm scripts.

## Usage

1. To build the app in memory for development execute `npm run start:dev`.
2. To build the app in the `./dist` folder for development, execute `npm run build:dev`.
3. To build the app in the `./dist` folder for production, execute `npm run build`.
4. To serve the `./dist` folder on a local server (after step 1. or 2.) execute `npm run start`.

## package.json scripts

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "eslint": "eslint src/js",
    "start:dev": "webpack-dev-server",
    "build:dev": "webpack",
    "build": "webpack -p",
    "start": "browser-sync start --server dist/ --files dist/ --no-notify"
  }
}
```
