const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserProfile = require("../../models/userProfile");

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    console.log("user register request came");
    // check if user exists
    const userExists = await User.exists({ mail: mail.toLowerCase() });

    console.log(userExists);

    if (userExists) {
      return res.status(409).send("E-mail already in use.");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in database
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    // create default user profile
    await UserProfile.create({
      userId: user._id,
      mail: mail,
      name: username,
      age: null,
      dateOfBirth: null,
      country: "",
      major: "",
      communicationStyles: "",
      biography: "",
      personalityTestResults: {
        extraversion: 0,
        agreeableness: 0,
        conscientiousness: 0,
        neuroticism: 0,
        openness: 0,
      },
      preferredStudyTechnique: "",
      preferredStudyLength: null,
      preferredBreakLength: null,
      todayStudyLength: 0,
      todayGoals: [],
      totalSessions: 0,
      totalGoals: 0,
      totalTickedGoals: 0,
    });

    // create JWT token
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

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
        _id: user._id,
      },
    });
  } catch (err) {
    return res.status(500).send("Error occured. Please try again");
  }
};

module.exports = postRegister;
