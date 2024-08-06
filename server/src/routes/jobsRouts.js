import express from 'express';
import {
  createJob,
  getAllJobs,
  getAllLiveJobs,
  getCompanys,
  getIndustries,
  getLocations,
} from '../controllers/jobController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/liveJobs', authenticate, authorizeAdmin, getAllLiveJobs);

router
  .route('/')
  .get(authenticate, authorizeAdmin, getAllJobs)
  .post(authenticate, createJob);
// router.route('/industry').get(getIndustries);
// router.route('/company').get(getCompanys);
router.route('/location').get(authenticate, getLocations);

export default router;
