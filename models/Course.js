import mongoose from   "mongoose";
const {Schema} = mongoose;


const courseShcema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
      },
      
      description: {
        type: String,
        required: true,
      },
      
      courseCategory: {
        type: String,
        required: true,
      },
      instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      instructorName: {
        type: String,
        required: true,
      },
      courseCover: {
        type: Array,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
      suspended: {
        type: Boolean,
        default: false,
      },
      lessons: [{
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        material: {
          type: Array,
        },
      }],
      enrolledUsers: [{
        lecturers:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        instructor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        students:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
      }],
}, {
    timestamps: true
})

courseShcema.pre('save', async function (next) {
  const Course = mongoose.model('Course', courseShcema);
  const course = this;

  // Check if a course with the same name already exists
  const existingCourse = await Course.findOne({ courseName: course.courseName });
  if (existingCourse) {
      const err = new Error('Course with the same name already exists');
      err.status = 400;
      err.message = 'Course with the same name already exists';
      return next(err.message); // Pass the error to the next middleware or route handler
  }

  // Continue with the save operation if no duplicate is found
  next();
});

export default mongoose.model('Course', courseShcema)