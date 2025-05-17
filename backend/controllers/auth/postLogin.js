const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OnlineUser = require("../../models/onlineUser");

const postLogin = async (req, res) => {
  try {
    console.log("login event came");
    const { mail, password } = req.body;
    console.log("Received:", { mail, password });

    const user = await User.findOne({ mail: mail.toLowerCase() });
    console.log("User found in DB?", user);

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("Password matched for:", user.username);

      // add user to OnlineUser collection
      await OnlineUser.findOneAndUpdate(
        { username: user.username },
        { username: user.username, lastSeen: new Date() },
        { upsert: true, new: true }
      );
      console.log("Online user should be added:", user.username);


      // send new token
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id,
        },
      });
    }
    console.log("Either user not found or wrong password.");

    return res.status(400).send("Invalid credentials. Please try again");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postLogin;
