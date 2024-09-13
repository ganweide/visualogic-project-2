const express = require('express');
const Package = require('../models/package');
const router = express.Router();

// Create a new package
router.post('/', async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    res.status(201).json(package);
  } catch (error) {
    res.status(500).json({ error: error.package });
  }
});

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.package });
  }
});

// Get a package by ID
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ error: error.package });
  }
});

// Update a package
router.put('/:id', async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ error: error.package });
  }
});

// Delete a package
router.delete('/:id', async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ package: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.package });
  }
});

module.exports = router;
