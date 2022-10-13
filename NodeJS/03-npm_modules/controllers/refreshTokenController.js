const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  // Get cookie
  const cookies = req.cookies;
  // If we have cookies, and if we do, check if we have a jwt property
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  // Look for user in db
  const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
  // If user is not found
  if (!foundUser) return res.sendStatus(403); // Forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign({ username: decoded.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
