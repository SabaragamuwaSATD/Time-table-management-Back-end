import mongoose from "mongoose";
import Timetable from "../models/TimeTable.js";


export const addTimetable = async (req, res) => {
  
  try {
    const { year, semester, day, slots } = req.body;
    const newTimetable = new Timetable({ year, semester, day, slots });
    await newTimetable.save();
    res.status(201).json({ message: 'Timetable data added successfully.' });
  } catch (err) {
    // Check if the error is due to duplicate entry
    if (err.message === 'Duplicate timetable entry found.') {
        res.status(409).json({ message: 'Duplicate timetable entry found.' });
    } else {
        // Send generic error response for other errors
        console.error('Error creating timetable entry:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
}
}

//get
export const getTimetable = async (req, res) => {
  try {
      const {  year, semester , day} = req.params;
      
      // Find timetable data for the specified day, year, and semester
      const timetable = await Timetable.findOne({year, semester, day });
      
      if (timetable) {
          res.status(200).json(timetable);
      } else {
          res.status(404).json({ message: 'Timetable data not found for the specified day, year, and semester.' });
      }
  } catch (err) {
      console.error('Error getting timetable data:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTimeTable = async (req, res) => {
  try {
    const { year, semester, day } = req.params;
    const { slots } = req.body;

    // Update timetable data for the specified year, semester, and day
    const updatedTimetable = await Timetable.findOneAndUpdate(
        { year, semester, day },
        { $set: { slots } },
        { new: true }
    );

    if (updatedTimetable) {
        res.status(200).json({ message: 'Timetable data updated successfully.' });
    } else {
        res.status(404).json({ message: 'Timetable data not found for the specified year, semester, and day.' });
    }
} catch (error) {
    console.error('Error updating timetable data:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}

export const deleteTimeTable = async (req, res) => {
  try {
    const { year, semester, day } = req.params;

    // Delete timetable data for the specified year, semester, and day
    const deletedTimetable = await Timetable.findOneAndDelete({ year, semester, day });

    if (deletedTimetable) {
        res.status(200).json({ message: 'Timetable data deleted successfully.' });
    } else {
        res.status(404).json({ message: 'Timetable data not found for the specified year, semester, and day.' });
    }
} catch (error) {
    console.error('Error deleting timetable data:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}