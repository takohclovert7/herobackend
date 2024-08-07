const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const {title, load,dateTime} = req.body
  // add to the database
  console.log({date:dateTime})
  try {
    const workout = await Workout.create({ title, load,deadLine:dateTime})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params
console.log({data:req.body,id})
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }
  const workout = await Workout.findOneAndUpdate({_id: id}, 
    {
      $set: {
        title:req.body.title,
        load: req.body.load,
        deadLine: req.body.deadLine
      }
    },
    { new: true } // Return the updated document
  )

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// mark tasks as Completed 
const markAsCompleted = async (req, res) => {
  const { id } = req.params
console.log({id})
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }
  const workout  = await Workout.findByIdAndUpdate(id, 
    { $set: { isCompleted: true } },
    { new: true }
  );
  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

// get  tasks comleted
const getWorkoutComplted = async (req, res) => {
 console.log("request reach server")

  const workout = await Workout.find({isCompleted: true })
  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

// get  tasks uncompleted
const getWorkoutUnCompleted = async (req, res) => {
  console.log("request reach server")
 
   const workout = await Workout.find({isCompleted: false })
   if (!workout) {
     return res.status(404).json({error: 'No such workout'})
   }
   res.status(200).json(workout)
 }
// dsearch a workout
const searchATask = async (req, res) => {
  const {title } = req.body

  const workout =await Workout.find({title: title})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }
  // console.log({workout})
  res.status(200).json(workout)
}



module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  markAsCompleted,
  getWorkoutComplted,
  getWorkoutUnCompleted,
  searchATask
}