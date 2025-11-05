const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/workoutsController');

router.post('/', ctrl.createWorkout);
router.get('/', ctrl.getWorkouts);
router.get('/:id', ctrl.getWorkout);
router.put('/:id', ctrl.updateWorkout);
router.delete('/:id', ctrl.deleteWorkout);

module.exports = router;
