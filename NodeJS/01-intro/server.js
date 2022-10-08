// Ways NodeJS differs from JS
// 1) Node runs on a server, not in a browser
// 2) The console is the terminal window
console.log("What's up");

// 3) Global object instead of window object
console.log(global);

// 4) Has common core modules
// 5) CommonJS modules instead of ES6 modules
const os = require("os");
const path = require("path");
const math = require("./math");
const { add, subtract, multiply, divide } = require("./math");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

console.log(math.add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));
