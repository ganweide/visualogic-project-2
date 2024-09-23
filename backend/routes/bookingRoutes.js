// added by eyna

const express = require("express");
const Booking = require("../models/booking");
const router = express.Router();

// Create a new Booking
router.post('/', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
      } catch (error) {
        res.status(500).json({ error: error.booking });
      }
    });

// Get all Booking
router.get('/get', async (req, res) => {
    try {
        const booking = await Booking.find();
        res.json(booking);
      } catch (error) {
        res.status(500).json({ error: error.booking });
      }
    });

// Get a Booking by ID
router.get('/:id', async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.booking });
    }
  });
  
  // Update a Booking
  router.put('/:id', async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a Booking
  router.delete('/:id', async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json({ booking: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.booking });
    }
  });
  
  module.exports = router;
  
