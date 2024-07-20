import Room from "../models/Rooms.js";
import mongoose from "mongoose";

export const addRooms = async (req, res, next) => {
    const newRoom = new Room(req.body);
    try {
        await newRoom.save();
        res.status(200).json("Room has been Saved");
    } catch (err) {
        next(err);
    }
};

export const updateRoom = async(req, res, next) => {
    try {
        await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json("Room has been Updated");
    } catch (err) {
        next(err);
    }
}

export const deleteRoom = async(req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getRoom = async(req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
}

export const getRooms = async(req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
}