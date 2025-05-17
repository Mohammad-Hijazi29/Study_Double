const express = require("express");
const Session = require("../models/session");
const mongoose = require("mongoose");

const router = express.Router();

// Get a session by ID
router.get("/:id", async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate("participants");
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new session
router.post("/", async (req, res) => {
  try {
    const { participants } = req.body;

    if (!participants || !Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({ message: "Participants array is required" });
    }

    const newSession = new Session({ participants });
    await newSession.save();

    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: "Failed to create session", error: error.message });
  }
});

// Update participants in a session
router.put("/:id", async (req, res) => {
  try {
    const { participants } = req.body;

    if (!participants || !Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({ message: "Participants array is required" });
    }

    const validParticipants = participants.map((p) => {
      try {
        return mongoose.Types.ObjectId(p);
      } catch (error) {
        return null;
      }
    }).filter((p) => p !== null);

    if (validParticipants.length === 0) {
      return res.status(400).json({ message: "Invalid participants data" });
    }

    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      { participants: validParticipants },
      { new: true }
    ).populate("participants");

    if (!updatedSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: "Failed to update session", error: error.message });
  }
});

// Add a user to an existing sesion
router.put("/:id/join", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.participants.includes(userId)) {
      return res.status(400).json({ message: "User already in session" });
    }

    session.participants.push(userId);
    await session.save();

    res.status(200).json({ message: "User added to the session", session });
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
