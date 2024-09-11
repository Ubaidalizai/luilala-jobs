import mongoose from 'mongoose';
import User from './userModel.js';
import lessons from './LessonsModule.js';
const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    certificate: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    FAQs: {
      type: String, // The type was misspelled as "teype"
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    image: {
      type: String,
      default:
        'https://media.istockphoto.com/id/2158807730/video/digital-marketing-workshop-african-american-designer-learning-new-skills.jpg?s=640x640&k=20&c=wtzlRdAVJunMpXn0XEPAn0M6h9RtUcUgE6ktgKu_-UM=',
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson', // References the Lesson model
      },
    ],
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the Student model
      },
    ],
  },
  { timestamps: true }
);
const Course = mongoose.model('Course', courseSchema);
export default Course;
