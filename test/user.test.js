import { Router } from "express";
//import  app  from "../app.js";
import User from "../models/User.js";
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

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/enroll", enrollCourse);
router.get("/:courseId/student-count", getTotalEnrolledCount);
router.get("/:userId/total-courses-created", getTotalCoursesCreated);
router.patch("/:userId/changeRole", changeUserRole);

describe('User API Testing...', () => {
    it('updateUser(put) API test --->', async () => {
        // Create a new user for testing
        const newUser = await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        });
    
        const userId = newUser._id;
    
        // Simulate updating user data
        const updatedUserData = {
            username: 'updatedusername',
            email: 'updatedemail@example.com',
            password: 'updatedpassword',
        };
    
        // Make PUT request to update user
        const response = await app.inject({
            method: 'PUT',
            url: `/api/users/${userId}`,
            payload: updatedUserData,
        });
    
        expect(response.statusCode).toBe(200);
    
        // Check if user data was updated correctly
        const updatedUser = await User.findById(userId);
        expect(updatedUser.username).toBe(updatedUserData.username);
        expect(updatedUser.email).toBe(updatedUserData.email);
    
        // Clean up: delete the test user
        await User.findByIdAndDelete(userId);
    }, 30000); // Timeout value set to 10 seconds (10000 ms)
    
});
