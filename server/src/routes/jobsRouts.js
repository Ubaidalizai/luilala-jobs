import express from 'express';
import { createJob } from '../controllers/jobController.js';
const router = express.Router();

router.route('/').post(createJob);
// router.route('/industries').get(jobController.getIndustries);
// router.route('/companys').get(jobController.getCompanys);
// router.route('/locations').get(jobController.getLocations);

export default router;
