const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  let user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (!user) return res.status(400).send("Invalid username or password.");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(req.body.password);
  console.log(user.password);
  console.log(validPassword);
  if (!validPassword)
    return res.status(400).send("Invalid username or password.");
  let token = user.generateAuthToken();

  user.isLoggedIn = true;
  user.save(() => {
    res.status(200).send({
      token: token,
    });
  });
}
exports.login = login;
