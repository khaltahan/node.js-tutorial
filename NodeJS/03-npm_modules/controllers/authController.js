const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const { stringify } = require("querystring");

const handleLogin = async (req, res) => {
  // Get username and password
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ Message: "Username and Password are required." });

  // Look for user in db
  const foundUser = usersDB.users.find((person) => person.username === user);
  // If user is not found
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // Create JWTs
    const accessToken = jwt.sign({ username: foundUser.username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    // Storing the refresh token in the data base with the user so that we can use it when we get a call back
    const otherUsers = usersDB.users.filter((person) => person.username !== foundUser.username);
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(usersDB.users));
    // Token should be stored in memory and not local storage
    // Refresh token needs to be stored so we send it as a cookie and hide it with httpOnly: true
    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    // Send the access token
    // Access token can be sent as json becuase it does not need to be stored
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
