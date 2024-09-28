import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
});

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;
