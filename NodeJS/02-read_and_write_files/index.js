const fsPromises = require("fs").promises;
const path = require("path");

// Hardcoding file directory
// fs.readFile("./files/starter.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

const fileOps = async () => {
  try {
    // Read starter.txt file and save it in data parameter
    const data = await fsPromises.readFile(path.join(__dirname, "files", "starter.txt"), "utf8");
    console.log(data);
    // Delete the starter.txt file
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    // Create a new file named promisWrite.txt in the files directory and provide its content with "data"
    await fsPromises.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data);
    // Append text to the promiseWrite.txt file
    await fsPromises.appendFile(path.join(__dirname, "files", "promiseWrite.txt"), "\n\nNice to meet you");
    // Rename the promiseWrite.txt to promiseComplete.txt
    await fsPromises.rename(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"));
    // Read the new files text
    const newData = await fsPromises.readFile(path.join(__dirname, "files", "promiseComplete.txt"), "utf8");
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

// Using path to find directory
// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// Call-back hell, it is better to async/wait
// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Nice to meet you",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete");

//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "Yes it is",
//       (err) => {
//         if (err) throw err;
//         console.log("Append complete");

//         fs.appendFile(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename complete");
//           }
//         );
//       }
//     );
//   }
// );

// Notice how this prints out before the file above
console.log("Hello...");

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
