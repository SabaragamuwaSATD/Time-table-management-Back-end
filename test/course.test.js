const { Router } = require("express");
const app = require("../app.js");
const Course = require("../models/Course.js");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController.js");

const router = Router();

router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);
router.post("/", createCourse);
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);

describe("Course API Testing...", () => {
  it("createCourse(post) API test case", async () => {
    // Create a new course data for testing
    const newCourseData = {
      courseName: "Introduction to NodeJs",
      description:
        "A comprehensive course covering JavaScript fundamentals and advanced topics.",
      courseCategory: "Programming",
      instructor: "65fb04d5d87ec37fbd081c56", // Assuming the instructor's ObjectId from the User collection
      instructorName: "Jacky chan",
      courseCover: ["https://example.com/course-cover.jpg"],
      rating: 4.5,
      suspended: false,
      lessons: [
        {
          title: "Introduction to Variables",
          description:
            "Learn about variables, data types, and variable declarations in JavaScript.",
          material: [
            "https://example.com/lesson1.pdf",
            "https://example.com/lesson1-code.zip",
          ],
        },
        {
          title: "Functions and Scope",
          description:
            "Explore functions, function declarations, and scope in JavaScript.",
          material: [
            "https://example.com/lesson2.pdf",
            "https://example.com/lesson2-code.zip",
          ],
        },
        {
          title: "Objects and Arrays",
          description:
            "Understand objects, arrays, and their manipulation in JavaScript.",
          material: [
            "https://example.com/lesson3.pdf",
            "https://example.com/lesson3-code.zip",
          ],
        },
      ],
    };

    // Make POST request to create a new course
    const response = await app.inject({
      method: "POST",
      url: "/api/courses",
      payload: newCourseData,
    });

    // Expect a successful response
    expect(response.statusCode).toBe(200);

    // Check if the course was created successfully in the database
    const createdCourse = await Course.findOne({
      courseName: newCourseData.courseName,
    });
    expect(createdCourse).toBeTruthy();
    expect(createdCourse.description).toBe(newCourseData.description);

    // Clean up: delete the test course from the database
    await Course.deleteOne({ _id: createdCourse._id });
  });
});
