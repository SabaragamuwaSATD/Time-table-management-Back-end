import { Router } from "express";
import { 
    addTimetable, 
    deleteTimeTable, 
    getTimetable, 
    updateTimeTable, 
} from "../controllers/timeTableController.js";


const router = Router();

router.post("/",addTimetable);
router.get("/:year/:semester/:day", getTimetable);
router.put("/:year/:semester/:day", updateTimeTable);
router.delete("/:year/:semester/:day", deleteTimeTable);

export default router;

