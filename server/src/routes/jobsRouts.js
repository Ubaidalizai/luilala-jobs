import express from 'express';
import {
  createJob,
  getAllJobs,
  getAllLiveJobs,
  getCompanys,
  getEmployerByJobId,
  getIndustries,
  getLocations,
} from '../controllers/jobController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(createJob).get(getAllJobs);
router.route('/industry').get(getIndustries);
router.route('/company').get(getCompanys);
router.route('/location').get(getLocations);

export default router;
