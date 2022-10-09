const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger, logEvents } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ["http://127.0.0.1:5500", "http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    // If it's not one of the website, or if it's undefined
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// "content-type: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// Sets files in that folder (images, css .etc) as public accessible by html
app.use(express.static(path.join(__dirname, "/public")));

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

// ^/$ means this begin with a slash ir it must end with a slash
// | means or
// (.html)? means it is not mandatory but could be used
app.get("^/$|index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", {root: __dirname});
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  // A 200 OK message is automatically sent
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  // By default, a 302 message is sent, so that is why we include the 301 message
  res.redirect(301, "/new-page.html");
});

// Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

// If nothing has been found
app.all("*", (req, res) => {
  // We add the status(404) becuase if we don't, it will send a 200 status
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Error handling is already done by Express
// If we were to set error handling, we set it up at the end of the document as Express uses a waterfall approach
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
