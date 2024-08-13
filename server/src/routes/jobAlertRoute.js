import express from 'express';
import {
  createJobAlert,
  deleteJobAlert,
  getAllJobAlerts,
  getAllJobAlertsForUser,
  getJobAlert,
  updateJobAlert,
} from '../controllers/JobAlertController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(authenticate, createJobAlert)
  .get(authenticate, getAllJobAlerts);

router
  .route('/jobAlertsLengthForCurrentUser')
  .get(authenticate, getAllJobAlertsForUser);

router
  .route('/:id')
  .get(authenticate, getJobAlert)
  .patch(authenticate, updateJobAlert)
  .delete(authenticate, deleteJobAlert);

export default router;
