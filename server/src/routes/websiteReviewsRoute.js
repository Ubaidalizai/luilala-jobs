import express from 'express';
const router = express.Router();
import {
  addTestimonials,
  getTestimonials,
} from '../controllers/websiteReviewsController.js';

// Route to get all testimonials
router.get('/getTestimonial', getTestimonials);
// Route to add a new testimonial (optional)
router.post('/addTestimonials', addTestimonials);

export default router;
