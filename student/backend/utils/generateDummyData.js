//  I USE Ai here to write this  dummydata file i can use 3 rd party api also to do this 


const Student = require('../models/Student');

const courses = [
  'Computer Science', 'Information Technology', 'Electronics', 'Mechanical Engineering',
  'Civil Engineering', 'Business Administration', 'Commerce', 'Arts', 'Science',
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature'
];

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Saanvi', 'Aanya', 'Aadhya', 'Ananya', 'Diya', 'Pihu', 'Prisha', 'Inaya', 'Riya', 'Ira',
  'Rahul', 'Amit', 'Rohit', 'Vikash', 'Suresh', 'Rajesh', 'Priya', 'Sneha', 'Pooja', 'Kavya'
];

const lastNames = [
  'Sharma', 'Verma', 'Gupta', 'Kumar', 'Singh', 'Patel', 'Jain', 'Agarwal', 'Mishra', 'Yadav',
  'Pandey', 'Shah', 'Mehta', 'Malhotra', 'Kapoor', 'Chopra', 'Bansal', 'Sinha', 'Joshi', 'Tiwari'
];

const generateRollNumber = (index) => {
  const year = Math.floor(Math.random() * 4) + 2021; 
  const dept = ['CS', 'IT', 'EC', 'ME', 'CE', 'BA', 'CO'][Math.floor(Math.random() * 7)];
  const num = String(index).padStart(3, '0');
  return `${year}${dept}${num}`;
};

const generateDummyStudents = async (count = 1000) => {
  try {
    console.log('Generating dummy student data...');
    

    await Student.deleteMany({});
    
    const students = [];
    
    for (let i = 1; i <= count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      students.push({
        name: `${firstName} ${lastName}`,
        rollNumber: generateRollNumber(i),
        course: courses[Math.floor(Math.random() * courses.length)],
        yearOfStudy: Math.floor(Math.random() * 4) + 1, 
        status: Math.random() > 0.8 ? 'Graduated' : 'Active' 
      });
    }
    
    await Student.insertMany(students);
    console.log(`${count} dummy students created successfully!`);
  } catch (error) {
    console.error('Error generating dummy data:', error);
  }
};

module.exports = generateDummyStudents;