import request from 'supertest';
import express from 'express';
import timeTableRouter from '../routes/timeTableRoutes';
import {
  addTimetable,
  //deleteTimeTable,
  //getTimetable,
  //updateTimeTable,
} from '../controllers/timeTableController';

// Create an Express app and use the timeTableRouter
const app = express();
app.use(express.json());
app.use('/api/timetable', timeTableRouter);

// Mock controller functions if needed
jest.mock('../controllers/timeTableController', () => ({
  addTimetable: jest.fn(),
  deleteTimeTable: jest.fn(),
  getTimetable: jest.fn(),
  updateTimeTable: jest.fn(),
}));

describe('TimeTable API Testing', () => {
  it('should add a new timetable', async () => {
    const timetableData = {
      year: 1,
      semester: 1,
      day: 'Monday',
      slots: [
        {
          time: '09:00 - 11:00',
          startTime: '09:00',
          endTime: '11:00',
          courseCode: 'CSE101',
          courseName: 'Introduction to Computer Science',
          lecturer: 'John Doe',
          venue: 'Room 101',
        },
      ],
    };

    addTimetable.mockResolvedValueOnce({ message: 'Timetable added successfully' });

    const response = await request(app)
      .post('/api/timetable')
      .send(timetableData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(addTimetable).toHaveBeenCalledWith(timetableData);
    expect(response.body).toEqual({ message: 'Timetable added successfully' });
  });

});
