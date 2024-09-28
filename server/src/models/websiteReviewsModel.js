import mongoose from 'mongoose';
import User from './userModel.js';

const testimonialSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true, // This would be the review content
    },
    rating: {
      type: Number,
      required: true, // Rating out of 5
      min: 1,
      max: 5,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References the Course model
    },
  },
  {
    timestamps: true,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
