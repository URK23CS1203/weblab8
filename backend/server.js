require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/members', require('./routes/members'));
app.use('/api/workouts', require('./routes/workouts'));

// basic route
app.get('/', (req, res) => res.send('Gym Membership & Workout Scheduler API'));

// error handling (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
