import express from 'express';
const router = express.Router();
import {
  addTestimonials,
  getTestimonials,
  getTestimonialsCount,
} from '../controllers/websiteReviewsController.js';

// Route to get all testimonials
router.get('/getTestimonial', getTestimonials);
// Route to add a new testimonial (optional)
router.post('/addTestimonials', addTestimonials);
router.get('/count', getTestimonialsCount);
export default router;
