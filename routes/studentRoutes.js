
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Student = require('../models/student');
const path = require('path');

router.post('/', upload.fields([{ name: 'photo' }, { name: 'video' }]), async (req, res) => {
    try {
      const { name, class: studentClass } = req.body;
      const photo = req.files['photo'] ? req.files['photo'][0].filename : null;
      const video = req.files['video'] ? req.files['video'][0].filename : null;
  
      const newStudent = new Student({
        name,
        class: studentClass,
        photo: photo ? `/uploads/${photo}` : null,
        video: video ? `/uploads/${video}` : null,
      });
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create student', error: error.message });
    }
  });
router.get('/',  async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch students', error: error.message });
    }
  });



router.put('/:id', upload.fields([{ name: 'photo' }, { name: 'video' }]), async (req, res) => {
    try {
      const { id } = req.params;
      const { name, class: studentClass } = req.body;
      const photo = req.files['photo'] ? req.files['photo'][0].filename : null;
      const video = req.files['video'] ? req.files['video'][0].filename : null;
  
      const updatedData = {
        name,
        class: studentClass,
      };
  
      if (photo) updatedData.photo = `/uploads/${photo}`;
      if (video) updatedData.video = `/uploads/${video}`;
  
      const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update student', error: error.message });
    }
  });



router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete student', error: error.message });
    }
  });

module.exports = router;
