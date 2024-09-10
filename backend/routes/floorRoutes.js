const express = require('express');
const Floor = require('../models/floor');
const router = express.Router();

// Create a new floor
router.post('/', async (req, res) => {
  try {
    const floor = new Floor(req.body);
    await floor.save();
    res.status(201).json(floor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all floors
router.get('/', async (req, res) => {
  try {
    const floors = await Floor.find();
    res.json(floors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a floor by ID
router.get('/:id', async (req, res) => {
  try {
    const floor = await Floor.findById(req.params.id);
    if (!floor) {
      return res.status(404).json({ error: 'Floor not found' });
    }
    res.json(floor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a floor
router.put('/:id', async (req, res) => {
  try {
    const floor = await Floor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!floor) {
      return res.status(404).json({ error: 'Floor not found' });
    }
    res.json(floor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a floor
router.delete('/:id', async (req, res) => {
  try {
    const floor = await Floor.findByIdAndDelete(req.params.id);
    if (!floor) {
      return res.status(404).json({ error: 'Floor not found' });
    }
    res.json({ message: 'Floor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
