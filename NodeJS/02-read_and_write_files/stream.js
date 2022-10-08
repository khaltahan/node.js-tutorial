const fs = require("fs");

// This is used for text files of large size
const rs = fs.createReadStream("./files/lorem.txt", "utf8");

const ws = fs.createWriteStream("./files/new-lorem.txt");

// rs.on("data", (dataChunck) => {
//   ws.write(dataChunck);
// });

// This is an alternative to the function above
rs.pipe(ws);
