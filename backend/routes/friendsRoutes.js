const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const FriendInvitation = require('../models/friendInvitation');

router.get("/status/:userId/:friendId", auth, async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const isFriend = user.friends.includes(friendId);
    res.json({ isFriend });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/add", auth, async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (userId === friendId) return res.status(400).json({ message: "You cannot add yourself as a friend" });

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({ message: "User not found" });

    if (user.friends.includes(friendId)) return res.status(400).json({ message: "Already friends" });

    user.friends.push(friendId);
    friend.friends.push(userId);
    
    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/remove", auth, async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({ message: "User not found" });

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/checkInvitation/:senderId/:receiverId', async (req, res) => {
    const { senderId, receiverId } = req.params;
  
    try {
      const invitation = await FriendInvitation.findOne({
        senderId,
        receiverId,
      });
  
      if (invitation) {
        return res.status(200).json({ pending: true });
      }
  
      return res.status(200).json({ pending: false });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to check invitation.' });
    }
  });

module.exports = router;
