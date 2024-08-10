import mongoose from 'mongoose';

const jobAlertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  keywords: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobAlert = mongoose.model('JobAlert', jobAlertSchema);
export default JobAlert;
