// added by eyna

const express = require("express");
const TransferPackage = require("../models/transferpackage");
const router = express.Router();

// Create a new TransferPackage
router.post('/', async (req, res) => {
    try {
        const transferpackage = new TransferPackage(req.body);
        await transferpackage.save();
        res.status(201).json(transferpackage);
      } catch (error) {
        res.status(500).json({ error: error.transferpackage });
      }
    });

// Get all TransferPackage
router.get('/get', async (req, res) => {
    try {
        const transferpackage = await TransferPackage.find();
        res.json(transferpackage);
      } catch (error) {
        res.status(500).json({ error: error.transferpackage });
      }
    });

// Get a TransferPackage by ID
router.get('/:id', async (req, res) => {
    try {
      const transferpackage = await TransferPackage.findById(req.params.id);
      if (!transferpackage) {
        return res.status(404).json({ error: 'TransferPackage not found' });
      }
      res.json(transferpackage);
    } catch (error) {
      res.status(500).json({ error: error.transferpackage });
    }
  });
  
  // Update a TransferPackage
  router.put('/:id', async (req, res) => {
    try {
      const transferpackage = await TransferPackage.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!transferpackage) {
        return res.status(404).json({ error: 'TransferPackage not found' });
      }
      res.json(transferpackage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a TransferPackage
  router.delete('/:id', async (req, res) => {
    try {
      const transferpackage = await TransferPackage.findByIdAndDelete(req.params.id);
      if (!transferpackage) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json({ transferpackage: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.transferpackage });
    }
  });
  
  module.exports = router;
  
