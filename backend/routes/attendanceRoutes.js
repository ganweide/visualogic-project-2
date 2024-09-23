// added by eyna

const express = require("express");
const Attendance = require("../models/attendance");
const router = express.Router();

// Create a new Attendance
router.post('/', async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).json(attendance);
      } catch (error) {
        res.status(500).json({ error: error.attendance });
      }
    });

// Get all Attendance
router.get('/get', async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json(attendance);
      } catch (error) {
        res.status(500).json({ error: error.attendance });
      }
    });

// Get a Attendance by ID
router.get('/:id', async (req, res) => {
    try {
      const attendance = await Attendance.findById(req.params.id);
      if (!attendance) {
        return res.status(404).json({ error: 'Attendance not found' });
      }
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: error.attendance });
    }
  });
  
  // Update a Attendance
  router.put('/:id', async (req, res) => {
    try {
      const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!attendance) {
        return res.status(404).json({ error: 'Attendance not found' });
      }
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a Attendance
  router.delete('/:id', async (req, res) => {
    try {
      const attendance = await Attendance.findByIdAndDelete(req.params.id);
      if (!attendance) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.json({ attendance: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.attendance });
    }
  });
  
  module.exports = router;
  
