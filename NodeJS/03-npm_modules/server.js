const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

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
app.get("/*", (re, res) => {
  // We add the status(404) becuase if we don't, it will send a 200 status
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
