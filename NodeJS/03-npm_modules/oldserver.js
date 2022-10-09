const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
// initialize object (create an instance of MyEmitter()
const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => {
  logEvents(msg, fileName);
});

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    //
    const rawData = await fsPromises.readFile(filePath, !contentType.includes("image") ? "utf8" : "");
    const data = contentType === "application/json" ? JSON.parse(rawData) : rawData;
    // Sends a response to the header request
    // If we are sending a 404.html page, then we send 404, else we send 200 message
    response.writeHead(!filePath.includes("404.html") ? 404 : 200, { "Content-Type": contentType });
    // response.end() is a built in interface to send a signal to the server that all the header has been sent
    response.end(contentType === "application/json" ? JSON.stringify(data) : data);
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  // req.url gets the part after localhost:3500
  // req.method gets http method (example GET, POST)
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  // path.extname gets the part after "." (example.json, css, js)
  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // Makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  // true if filePath exists
  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    // serve the file
    serveFile(filePath, contentType, res);
  } else {
    // 404
    // 301 redirect
    // .base gets the file name including extension (ex inde.html)
    switch (path.parse(filePath).base) {
      case "old-page.html":
        // Redirect location to new-page.html
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        // Redirect location to index.html
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        // Serve a 404 response
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// add listener for the log event and emit

// If we only want to send one argument
// add listener for the log event
// myEmitter.on("log", (msg) => {
//   logEvents(msg);
// });

// setTimeout(() => {
//   // Emit event
//   myEmitter.emit("log", "log event emitted");
// }, 3000);
