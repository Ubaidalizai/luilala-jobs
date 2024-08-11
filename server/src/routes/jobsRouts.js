import express from 'express';
import {
  createJob,
  getAllJobs,
  getAllLiveJobs,
  getAllLiveJobsLength,
  getCompanys,
  getCompanysLength,
  getEmployerByJobId,
  getIndustries,
  getLocations,
} from '../controllers/jobController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/liveJobs').get(getAllLiveJobs);
router.route('/liveJobsLength').get(getAllLiveJobsLength);
router.route('/').get(authenticate, authorizeAdmin, getAllJobs);

router.route('/').post(authenticate, createJob);
router.route('/:jobId/employers').get(authenticate, getEmployerByJobId);
router.route('/industry').get(authenticate, getIndustries);
router.route('/company').get(authenticate, getCompanys);
router.route('/companyLength').get(getCompanysLength);
router.route('/location').get(authenticate, getLocations);

export default router;
