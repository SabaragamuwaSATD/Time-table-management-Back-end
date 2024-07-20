import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findById(id);
        res.status(200).json(notification);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateNotification = async(req, res) => {
    const { id } = req.params;
    const { title, message, type, recipients } = req.body;
    try {
        await Notification.findByIdAndUpdate(id, { title, message, type, recipients }, { new: true });
        res.status(200).json("Notification Updated Succesfully");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addNotification = async (req, res) => {
    const { title, message, type, recipients } = req.body;
    try {
        await Notification.create({ title, message, type, recipients });
        res.status(201).json("Notification Added Succesfully");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
        await Notification.findByIdAndDelete(id);
        res.status(200).json("Notification Removed Succesfully");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
