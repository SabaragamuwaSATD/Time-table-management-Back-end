import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

// Define a schema for the timetable
const timetableSchema = new Schema({
    year: { 
        type: Number,
        enum: [1,2,3,4], 
        required: true },
    semester: { 
        type: Number, 
        enum: [1, 2],
        required: true },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        required: true
    },
    slots: [{
        time: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        courseCode: { type: String,required: true },
        courseName: { type: String, required: true },
        lecturer: { type: String, required: true },
        venue: { type: String, required: true }
    }]
});

timetableSchema.pre('save', async function (next) {
    const timetable = this;

    try {
        // Check if there is an existing timetable entry with the same year, semester, and day
        const existingTimetable = await mongoose.models.Timetable.findOne({
            year: timetable.year,
            semester: timetable.semester,
            day: timetable.day
        });

        if (existingTimetable) {
            const err = new Error('Duplicate timetable entry found.');
            return next(err);
        }

        next(); // Proceed with saving the data
    } catch (error) {
        return next(error); // Pass any errors to the next middleware
    }
});

// Create a model based on the schema
const Timetable = model('Timetable', timetableSchema);

export default Timetable;
