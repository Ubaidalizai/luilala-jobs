import express from 'express';
import {
  createJob,
  findJobs,
  getAllJobs,
  getAllLiveJobs,
  getAllLiveJobsLength,
  getAllTrending,
  getCompanys,
  getCompanysLength,
  getEmployerByJobId,
  getIndustries,
  getIndustriess,
  getLocations,
} from '../controllers/jobController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.route('/findJob').get(findJobs)
router.route('/liveJobs').get(getAllLiveJobs);
router.route('/trendingJob').get(getAllTrending);
router.route('/liveJobsLength').get(getAllLiveJobsLength);
router.route('/').get(authenticate, authorizeAdmin, getAllJobs);

router.route('/').post(authenticate, createJob);
router.route('/:jobId/employers').get(authenticate, getEmployerByJobId);
router.route('/industry').get(getIndustries);
// This industres for search part
router.route('/industrys').get(getIndustriess);
router.route('/company').get(getCompanys);
router.route('/companyLength').get(getCompanysLength);
router.route('/location').get(getLocations);

export default router;
