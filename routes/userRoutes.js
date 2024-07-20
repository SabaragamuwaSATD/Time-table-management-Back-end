import { Router } from "express";
import {
  changeUserRole,
  deleteUser,
  enrollCourse,
  getTotalCoursesCreated,
  getTotalEnrolledCount,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";



const router = Router();



router.put("/:id",  updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/enroll", enrollCourse);
router.get("/:courseId/student-count",  getTotalEnrolledCount);
router.get("/:userId/total-courses-created",  getTotalCoursesCreated);
router.patch("/:userId/changeRole", changeUserRole);

export default router;