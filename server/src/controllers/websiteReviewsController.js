import Testimonial from '../models/websiteReviewsModel.js';
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Add a new testimonial
const addTestimonials = async (req, res) => {
  try {
    const { image, text } = req.body;
    const newTestimonial = new Testimonial({ image, text });
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(400).json({ message: 'Error adding testimonial', error });
  }
};

export { getTestimonials, addTestimonials };
