import { Schema, model } from 'mongoose';


// Define the Room schema
const roomSchema = new Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    roomType: {
        type: String,
        enum: ['Lab', 'Lecture Hall', 'Auditorium'],
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    resources: [{
        type: Schema.Types.ObjectId,
        ref: 'Resource',
    }],
}, {
    timestamps: true,
});

// Create the Room model
const Room = model('Room', roomSchema);

export default Room;
