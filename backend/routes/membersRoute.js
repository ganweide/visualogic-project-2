// members route
const express = require("express");
const Members = require("../models/members");
const router = express.Router();

// Create a new Members
router.post("/", async (req, res) => {
    try {
        const members = new Members(req.body);
        await members.save();
        res.status(201).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all Members
router.get("/", async (req, res) => {
    try {
        const members = await Members.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Members by ID
router.get("/:id", async (req, res) => {
    try {
        const members = await Members.findById(req.params.id);
        if (!members) {
            return res.status(404).json({ error: 'Members not found' });
        }
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Members
router.put("/:id", async (req, res) => {
    try {
        const members = await Members.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!members) {
            return res.status(404).json({ error: 'Members not found' });
        }
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Members
router.delete("/:id", async (req, res) => {
    try {
        const members = await Members.findByIdAndDelete(req.params.id);
        if (!members) {
            return res.status(404).json({ error: 'Members not found' });
        }
        res.json({ members: 'Members deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;