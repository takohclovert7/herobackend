const express = require('express')
const {
  getWorkouts, 
  getWorkout, 
  createWorkout, 
  deleteWorkout, 
  updateWorkout,
  markAsCompleted,
  getWorkoutComplted,
  getWorkoutUnCompleted,
  searchATask
} = require('../controllers/workoutController')

const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// GET  workout completed
router.get('/task/completed',getWorkoutComplted)

// GET  workout uncompleted
router.get('/task/uncompleted',getWorkoutUnCompleted)


// POST a new workout
router.post('/', createWorkout)

// seach for a task
router.post('/search/task', searchATask)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

router.patch('/markascompleted/:id', markAsCompleted)

module.exports = router