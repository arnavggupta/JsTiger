require('dotenv').config();
const express = require('express');

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const generateDummyStudents = require('./utils/generateDummyData');

const app = express();


connectDB();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);


app.post('/api/generate-dummy-data', async (req, res) => {
  try {
    await generateDummyStudents(1000);
    res.json({ message: 'Dummy data generated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});