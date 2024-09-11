import { Router } from 'express';
import {
  createEmployer,
  loginEmployer,
  logoutCurrentEmployer,
  getAllEmployers,
  getCurrentEmployerProfile,
  updateCurrentEmployerProfile,
  getEmployerByID,
  updateEmployerByID,
  deleteEmployerByID,
  searchEmployerByName,
  uploadEmployerPhoto,
  resizeEmployerPhoto,
  updateEmployerPhoto,
  updatePassword,
  employersLogos,
  getAllJobsOfCurrentEmployer,
} from '../controllers/EmployerController.js';

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/register').post(createEmployer);
router.route('/login').post(loginEmployer);
router.route('/logout').post(logoutCurrentEmployer);

router.route('/search').get(authenticate, searchEmployerByName);
router.route('/update-password').patch(authenticate, updatePassword);
router.route('/logos').get(employersLogos);
router.route('/jobs').get(authenticate, getAllJobsOfCurrentEmployer);

router.patch(
  '/updateMe',
  authenticate,
  uploadEmployerPhoto,
  resizeEmployerPhoto,
  updateEmployerPhoto
);

router
  .route('/profile')
  .get(authenticate, getCurrentEmployerProfile)
  .patch(authenticate, updateCurrentEmployerProfile);

// Admin Routes
router.use(authenticate, authorizeAdmin);
router.route('/').get(getAllEmployers);
router
  .route('/:id')
  .get(getEmployerByID)
  .patch(updateEmployerByID)
  .delete(deleteEmployerByID);
export default router;
