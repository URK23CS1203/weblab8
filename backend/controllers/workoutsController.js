const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  try {
    const w = new Workout(req.body);
    await w.save();
    res.status(201).json(w);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    // optional query param memberId to filter
    const filter = {};
    if (req.query.memberId) filter.member = req.query.memberId;
    const workouts = await Workout.find(filter).populate('member', 'name email').sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('member', 'name email');
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Workout not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const removed = await Workout.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
