import express from 'express';

import {
  createCourse,
  getAllCourses,
  getCourseByID,
  updateCourseByID,
  deleteCourseByID,
} from '../controllers/courseController.js';

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(authenticate, getAllCourses)
  .post(authenticate, authorizeAdmin, createCourse);

router
  .route('/:id')
  .get(authenticate, getCourseByID)
  .patch(authenticate, authorizeAdmin, updateCourseByID)
  .delete(authenticate, authorizeAdmin, deleteCourseByID);

export default router;