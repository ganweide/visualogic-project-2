// added by eyna

const express = require("express");
const Purchase = require("../models/purchase");
const router = express.Router();

// Create a new Purchase
router.post('/', async (req, res) => {
    try {
        const purchase = new Purchase(req.body);
        await purchase.save();
        res.status(201).json(purchase);
      } catch (error) {
        res.status(500).json({ error: error.purchase });
      }
    });

// Get all Purchase
router.get('/get', async (req, res) => {
    try {
        const purchase = await Purchase.find();
        res.json(purchase);
      } catch (error) {
        res.status(500).json({ error: error.purchase });
      }
    });

// Get a Purchase by ID
router.get('/:id', async (req, res) => {
    try {
      const purchase = await Purchase.findById(req.params.id);
      if (!purchase) {
        return res.status(404).json({ error: 'Purchase not found' });
      }
      res.json(purchase);
    } catch (error) {
      res.status(500).json({ error: error.purchase });
    }
  });
  
  // Update a Purchase
  router.put('/:id', async (req, res) => {
    try {
      const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!purchase) {
        return res.status(404).json({ error: 'Purchase not found' });
      }
      res.json(purchase);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a Purchase
  router.delete('/:id', async (req, res) => {
    try {
      const purchase = await Purchase.findByIdAndDelete(req.params.id);
      if (!purchase) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json({ purchase: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.purchase });
    }
  });
  
  module.exports = router;
  
