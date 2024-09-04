// routes/jobRoutes.js
import express from 'express';
const router = express.Router();
import {
  createJob,
  getAllJobs,
  deleteJobById,
} from '../controllers/populareindustriesController.js';

// Route to create a new job entry
router.route('/jobs').post(createJob).get(getAllJobs);

// Route to get a specific job entry by ID
router.route('/jobs/:id').delete(deleteJobById);

export default router;
