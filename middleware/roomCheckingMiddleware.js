import Room from '../models/Rooms.js';


export const checkRoomExists = async function(req, res, next) {
  const { roomNumber, location } = req.body;

  try {
    // Check if a room with the same roomNumber and location already exists
    const existingRoom = await Room.findOne({ roomNumber, location });

    if (existingRoom) {
      return res.status(400).json({ error: 'Room already exists' });
    }
    // Room doesn't exist, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error checking room existence:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

