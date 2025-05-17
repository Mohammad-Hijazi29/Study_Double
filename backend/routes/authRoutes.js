const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

router.post("/logout", authControllers.controllers.postLogout);

router.patch("/api/profile/:userId", async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId: userId },
      { $set: updates },
      { new: true, runValidators: true } 
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json(updatedProfile); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// test route to verify if our middleware is working
router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;
