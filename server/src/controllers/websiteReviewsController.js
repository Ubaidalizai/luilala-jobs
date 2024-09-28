import Testimonial from '../models/websiteReviewsModel.js';

// Get all testimonials with populated user details
const getTestimonials = async (req, res) => {
  try {
    // Populate the userId field to include user details in the response
    const testimonials = await Testimonial.find().populate(
      'userId',
      'fullName'
    );
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Add a new testimonial
const addTestimonials = async (req, res) => {
  try {
    const { text, rating, userId } = req.body;

    // Validate the rating and ensure it is between 1 and 5
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: 'Rating must be between 1 and 5' });
    }

    // Create a new testimonial
    const newTestimonial = new Testimonial({ text, rating, userId });
    const savedTestimonial = await newTestimonial.save();

    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error adding testimonial', error });
  }
};

// Get the count of testimonials
const getTestimonialsCount = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments(); // Get the count of testimonials
    res.json(count); // Return the count in a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export { getTestimonials, addTestimonials, getTestimonialsCount };
