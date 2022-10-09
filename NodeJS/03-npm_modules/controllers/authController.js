const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

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
    // Create a JWT
    res.json({ success: `User ${user} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
