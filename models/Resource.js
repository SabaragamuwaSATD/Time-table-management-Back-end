import { Schema, model } from 'mongoose';

// Define the Resource schema
const resourceSchema = new Schema({
    resourceType: {
        type: String,
        enum: ['Projector', 'Computer'],
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    roomNumber: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true,
});

// Create the Resource model
const Resource = model('Resource', resourceSchema);

export default Resource;
