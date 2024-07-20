// models/Notification.js
import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['timetable', 'room', 'announcement'],
    required: true,
  },
  recipients: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

notificationSchema.pre('save', async function (next) {
  const Notification = mongoose.model('Notification', notificationSchema);
  const notification = this;


  const existingNotification = await Notification.findOne({
      title: notification.title,
      message: notification.message,
  });
  if (existingNotification) {
      const err = new Error('Notification with the same title and message already exists');
      return next(err);
  }
  next();
});

const Notification = model('Notification', notificationSchema);

export default Notification;
