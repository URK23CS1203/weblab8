const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, default: 3 },
  reps: { type: Number, default: 10 },
  notes: { type: String }
});

const WorkoutSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  date: { type: Date, default: Date.now },
  exercises: { type: [ExerciseSchema], default: [] },
  trainerNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
