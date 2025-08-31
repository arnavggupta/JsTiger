const express = require('express');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

const router = express.Router();


router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { rollNumber: { $regex: search, $options: 'i' } },
          { course: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const students = await Student.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(query);

    res.json({
      students,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found in mongodb' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', auth, async (req, res) => {
  try {
    const { name, rollNumber, course, yearOfStudy, status } = req.body;


    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }

    const student = new Student({
      name,
      rollNumber,
      course,
      yearOfStudy,
      status
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:id', auth, async (req, res) => {
  try {
    const { name, rollNumber, course, yearOfStudy, status } = req.body;

    // Check if roll number exists for other students
    const existingStudent = await Student.findOne({ 
      rollNumber, 
      _id: { $ne: req.params.id } 
    });
    
    if (existingStudent) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, rollNumber, course, yearOfStudy, status },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;