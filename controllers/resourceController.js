import Resource from "../models/Resource.js";
import Room from "../models/Rooms.js";

export const addResource = async (req, res, next) => {
    const newResource = new Resource(req.body);
    try {
        const savedResource = await newResource.save();
        await Room.findByIdAndUpdate(req.body.roomNumber, {
            $push: { resources: savedResource._id },
        })
        res.status(200).json(savedResource);
    } catch (err) {
        next(err);
    }
};

export const updateResource = async (req, res, next) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedResource);
    } catch (err) {
        next(err);
    }
};

export const deleteResource = async (req, res, next) => {
    try {
        await Resource.findByIdAndDelete(req.params.id);
        res.status(200).json("Resource has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getResource = async (req, res, next) => {
    try {
        const resource = await Resource.findById(req.params.id);
        res.status(200).json(resource);
    } catch (err) {
        next(err);
    }
};

export const getResources = async (req, res, next) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (err) {
        next(err);
    }
}

