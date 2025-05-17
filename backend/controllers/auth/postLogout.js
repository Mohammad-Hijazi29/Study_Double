const OnlineUser = require("../../models/onlineUser");

const postLogout = async (req, res) => {
  try {
    const username = req.body.username;

    if (!username) {
      return res.status(400).send("Username is required");
    }

    await OnlineUser.deleteOne({ username: username });

    return res.status(200).send("User logged out successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postLogout;
