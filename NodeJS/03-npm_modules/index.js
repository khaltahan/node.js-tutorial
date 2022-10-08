// Import logEvents function
const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initialize object (create an instance of MyEmitter()
const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on("log", (msg, sender) => {
  logEvents(msg, sender);
});

setTimeout(() => {
  // Emit event
  myEmitter.emit("log", "log event emitted", "Khalid A.");
}, 3000);

// If we only want to send one argument
// add listener for the log event
// myEmitter.on("log", (msg) => {
//   logEvents(msg);
// });

// setTimeout(() => {
//   // Emit event
//   myEmitter.emit("log", "log event emitted");
// }, 3000);
