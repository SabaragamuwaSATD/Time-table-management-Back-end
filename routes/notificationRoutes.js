import {
    getNotifications,
    addNotification,
    updateNotification,
    deleteNotification,
    getNotification
} from "../controllers/notificationController.js";

import express from "express";
const router = express.Router();

router.get("/:id", getNotification);
router.get("/", getNotifications);
router.post("/", addNotification);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);


export default router