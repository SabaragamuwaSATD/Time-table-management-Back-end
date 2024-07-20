import { Router } from "express";
import { 
    addResource, 
    updateResource, 
    deleteResource, 
    getResource, 
    getResources,
} from "../controllers/resourceController.js";



const router = Router();


router.post("/", addResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);
router.get("/:id", getResource);
router.get("/", getResources);


export default router