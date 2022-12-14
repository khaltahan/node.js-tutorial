// npm imports
// Calling format function from date-fns npm
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// built in imports
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    // If "logs" directory does not exist
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      // Make a directory called "logs"
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    // Append logItem to eventLog.txt file in "logs" directory
    await fsPromises.appendFile(path.join(__dirname, "..", "logs", logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

// Export the logEvents function
module.exports = { logger, logEvents };

// console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

// console.log(uuid());

// console.log();

// In our package.json file, we could have versions starting with, ~, ^, or *
// ~ only updates patches
// ^ updates minor upgrades and bacthes
// * updates everything

// When uninstalling a devdependency, be sure to remove it from the start object in the json package
