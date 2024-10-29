
const express = require('express');
const Allotment = require('../models/allotment');
const Student = require('../models/student');
const Book = require('../models/book'); 
const router = express.Router();

// Create a new allotment
router.post('/', async (req, res) => {
  try {
    const { studentId, bookId, startDate, endDate } = req.body;

    // Validate student and book existence
    const student = await Student.findById(studentId);
    const book = await Book.findById(bookId);
    if (!student || !book) {
      return res.status(404).json({ error: 'Student or Book not found' });
    }

    const allotment = new Allotment({ studentId, bookId, startDate, endDate });
    await allotment.save();
    res.status(201).json(allotment);
  } catch (err) {
    console.error("Error creating allotment:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update an existing allotment
router.put('/:id', async (req, res) => {
  try {
    const { studentId, bookId, startDate, endDate } = req.body;

    // Validate student and book existence
    const student = await Student.findById(studentId);
    const book = await Book.findById(bookId);
    if (!student || !book) {
      return res.status(404).json({ error: 'Student or Book not found' });
    }

    const allotment = await Allotment.findByIdAndUpdate(
      req.params.id,
      { studentId, bookId, startDate, endDate },
      { new: true }
    );

    if (!allotment) {
      return res.status(404).json({ error: 'Allotment not found' });
    }

    res.json(allotment);
  } catch (err) {
    console.error("Error updating allotment:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete an allotment
router.delete('/:id', async (req, res) => {
  try {
    const allotment = await Allotment.findByIdAndDelete(req.params.id);
    if (!allotment) {
      return res.status(404).json({ error: 'Allotment not found' });
    }
    res.json({ message: 'Allotment deleted' });
  } catch (err) {
    console.error("Error deleting allotment:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all allotments
router.get('/', async (req, res) => {
  try {
    const allotments = await Allotment.find().populate('studentId bookId');
    res.json(allotments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
