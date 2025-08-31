const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  yearOfStudy: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  status: {
    type: String,
    enum: ['Active', 'Graduated'],
    default: 'Active'
  }
}, {
  timestamps: true
});


studentSchema.index({ name: 'text', rollNumber: 'text' });

module.exports = mongoose.model('Student', studentSchema);