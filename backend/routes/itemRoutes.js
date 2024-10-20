const express = require("express");
const router = express.Router();
const Item = require("../models/Items");
const authMiddleware = require("../middleware/authMiddleware");

// POST /items - Add a new item
router.post("/items", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newItem = new Item({
      title,
      description,
      user: req.user.id, // req.user is set by authMiddleware
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// GET /items - Get all items for the authenticated user
router.get("/items", authMiddleware, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
});

module.exports = router;
