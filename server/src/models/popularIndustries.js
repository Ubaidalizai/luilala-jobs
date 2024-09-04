// models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  jobTitles: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const populateIndustries = mongoose.model('populateIndustries', jobSchema);

export default populateIndustries;
