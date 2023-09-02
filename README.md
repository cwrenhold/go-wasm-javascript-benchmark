This is a very simple project to test out generating numbers in Go via WASM to generating numbers in JavaScript natively.

## How to run

1. Clone the repo
2. Open the project in VSCode
3. Open the project's dev container
4. After the project has loaded in the dev container, run the default build task in VSCode
5. Open the `index.html` file in the browser, this is hosted on port 3000 by nginx in the dev container setup

## Options

This is also setup to build with [tinygo](https://tinygo.org/) which generates a much smaller wasm file. To do this, follow the steps below after the initial steps listed above:

1. Run the `Build wasm with tinygo` task in VSCode
2. In the `index.html` file, change the `wasm_exec.js` script to `tiny_wasm_exec.js`
3. In the `runner.js` file, comment out the block titled `// Setup for Go`
4. Uncomment the block titled `// Setup for TinyGo`
5. Refresh the page in the browser
