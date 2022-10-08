// Calling format function from date-fns npm
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

console.log(uuid());

console.log();

// In our package.json file, we could have versions starting with, ~, ^, or *
// ~ only updates patches
// ^ updates minor upgrades and bacthes
// * updates everything

// When uninstalling a devdependency, be sure to remove it from the start object in the json package
