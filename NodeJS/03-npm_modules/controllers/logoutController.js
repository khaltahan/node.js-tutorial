const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogOut = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  // If we have cookies, and if we do, check if we have a jwt property
  if (!cookies?.jwt) return res.sendStatus(204); //No content;
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  // Look for user in db
  const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: trure });
    return res.sendStatus(204);
  }

  // Delete the refresh token in the database
  // Find the users without the refresh token
  const otherUsers = usersDB.users.filter((person) => person.refreshToken !== foundUser.refreshToken);
  // Remover the token if the user found
  const currentUser = { ...foundUser, refreshToken: "" };
  // Read user into database after removing their refresh token
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(usersDB.users));

  res.clearCookie("jwt", { httpOnly: true }); // secure: true - only secures on https
  res.sendStatus(204);
};

module.exports = { handleLogOut };
