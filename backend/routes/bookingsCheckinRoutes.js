// added by eyna

const express = require("express");
const BookingsCheckin = require("../models/bookingsCheckin");
const router = express.Router();

// Create a new BookingsCheckin
router.post('/', async (req, res) => {
    try {
        const bookingsCheckin = new BookingsCheckin(req.body);
        await bookingsCheckin.save();
        res.status(201).json(bookingsCheckin);
      } catch (error) {
        res.status(500).json({ error: error.bookingsCheckin });
      }
    });

// Get all BookingsCheckin
router.get('/get', async (req, res) => {
    try {
        const bookingsCheckin = await BookingsCheckin.find();
        res.json(bookingsCheckin);
      } catch (error) {
        res.status(500).json({ error: error.bookingsCheckin });
      }
    });

// Get a BookingsCheckin by ID
router.get('/:id', async (req, res) => {
    try {
      const bookingsCheckin = await BookingsCheckin.findById(req.params.id);
      if (!bookingsCheckin) {
        return res.status(404).json({ error: 'BookingsCheckin not found' });
      }
      res.json(bookingsCheckin);
    } catch (error) {
      res.status(500).json({ error: error.bookingsCheckin });
    }
  });
  
  // Update a BookingsCheckin
  router.put('/:id', async (req, res) => {
    try {
      const bookingsCheckin = await BookingsCheckin.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!bookingsCheckin) {
        return res.status(404).json({ error: 'BookingsCheckin not found' });
      }
      res.json(bookingsCheckin);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a BookingsCheckin
  router.delete('/:id', async (req, res) => {
    try {
      const bookingsCheckin = await BookingsCheckin.findByIdAndDelete(req.params.id);
      if (!bookingsCheckin) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json({ bookingsCheckin: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.bookingsCheckin });
    }
  });
  
  module.exports = router;
  
