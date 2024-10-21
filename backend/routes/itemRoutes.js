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

// Put /items/:id - Update an item
router.put("/items/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const item = await Item.findOne({ _id: req.params.id, user: req.user.id });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.title = title;
    item.description = description;

    const updatedItem = await item.save();
    res.json(updatedItem);

    console.log("Item updated from to", updatedItem);

  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// DELETE /items/:id - Delete an item
router.delete("/items/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, user: req.user.id });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    await item.deleteOne({ _id: req.params.id });
    res.json({ message: "Item deleted Successfully" });
    
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
