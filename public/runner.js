if (!WebAssembly.instantiateStreaming) { // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
        const source = await (await resp).arrayBuffer();
        return await WebAssembly.instantiate(source, importObject);
    };
}

// Setup for Go
const go = new Go();
let mod, inst;
WebAssembly.instantiateStreaming(fetch("dist/random.wasm"), go.importObject).then(async (result) => {
    mod = result.module;
    inst = result.instance;
    await go.run(inst);
});

// Setup for TinyGo
// const tinyGo = new Go();
// let tinyMod, tinyInst;
// WebAssembly.instantiateStreaming(fetch("dist/tiny_random.wasm"), tinyGo.importObject).then(async (result) => {
//     tinyMod = result.module;
//     tinyInst = result.instance;
//     await tinyGo.run(tinyInst);
// });

function generateRandomWithGo() {
    return generateRandom();
}

function generateRandomWithJS() {
    return Math.random();
}

function generateAndDisplayRandom() {
    const numFromGo = generateRandomWithGo();
    const numFromJS = generateRandomWithJS();

    return { numFromGo, numFromJS };
}

const runSingle = document.getElementById("run-single");
if (runSingle) {
    runSingle.addEventListener("click", () => 
    {
        const { numFromGo, numFromJS } = generateAndDisplayRandom();

        document.getElementById('result').innerText = `Random number from Go: ${numFromGo}; Random number from JS: ${numFromJS}`;
    });
}

const benchmarker = function(func) {
    const startTime = performance.now();

    func();

    const endTime = performance.now();
    return endTime - startTime;
}

const runMultiple = document.getElementById("run-multiple");
if (runMultiple) {
    runMultiple.addEventListener("click", () =>
    {
        const numTimes = 10_000_000;
        
        const timeTakenForGo = benchmarker(() => generateAverage(numTimes));
        const timeTakenForJS = benchmarker(() => {
            let sum = 0;
            for (let i = 0; i < numTimes; i++) {
                sum += generateRandomWithJS();
            }
            return sum / numTimes;
        });

        document.getElementById('result').innerText = `Time taken for Go: ${timeTakenForGo}ms; Time taken for JS: ${timeTakenForJS}ms`;
    });
}
