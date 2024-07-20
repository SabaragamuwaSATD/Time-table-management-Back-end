import {
    addRooms,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoom
} from "../controllers/roomController.js";
import { Router } from "express";
import {checkRoomExists} from "../middleware/roomCheckingMiddleware.js";

const router = Router();


router.post("/", checkRoomExists,addRooms);
router.put("/:id", checkRoomExists,updateRoom);
router.delete("/:id", deleteRoom);
router.get("/:id", getRoom);
router.get("/", getRooms);


export default router