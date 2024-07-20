import Course from "../models/Course.js";


export const getAllCourses = async(req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).send("Error fetching courses");
    }
}

export const getCourseById = async(req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).send("Course not found");
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).send("Error fetching course");
    }
}

export const createCourse = async(req, res) => {
    const newCourse = new Course(req.body);
    try {
        const savedCourse = await newCourse.save();
        res.status(200).json("Course Created Succesfully");
    } catch (error) {
        res.status(400).send(error);
    }
}

export const updateCourse = async(req, res) => {
    const { courseId } = req.params;
    const course = req.body;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, course, { new: true });
        if(!updatedCourse) {
            return res.status(404).send("Course not found");
        }
        res.status(200).json("Course Updated Succesfully");
    } catch (error) {
        res.status(400).send("Error updating course");
    }
}

export const deleteCourse = async(req, res) => {
    const { courseId } = req.params;
    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if(!deletedCourse) {
            return res.status(404).send("Course not found");
        }
        res.status(200).json("Course Deleted Succesfully");
    } catch (error) {
        res.status(400).send("Error deleting course");
    }
}