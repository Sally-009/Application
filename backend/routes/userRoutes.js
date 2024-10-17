const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

require("dotenv").config();

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { username, password, firstname, lastname } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      firstname,
      lastname,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
  const { username, password } = req.body;
  console.log("username in login route", username);

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
  return res.status(400).json({ message: "Invalid credentials" });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
  return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create and return JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "1h",
  });

  res.json({ token });

} catch (error) {
  res.status(500).json({ error: "Failed to login" });
  console.error("Error:", error);
}
});

// Get username route
router.get("/username", async (req, res) => {
  try {
    const token = req.header("Authorization");
    console.log("token in get username route", token);

    if (!token) {
      return res.status(401).json({ message: "Authorization denied" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ message: "Token verification failed" });
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the username
    res.json({ username: user.username });

  } catch (error) {
    res.status(500).json({ error: "Failed to get username" });
  }
});

module.exports = router;