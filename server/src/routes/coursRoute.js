import express from 'express';

import {
  createCourse,
  getAllCourses,
  getCourseByID,
  updateCourseByID,
  deleteCourseByID,
  courseCategories,

  courseCategoriesNames,
  coursesTypes,
  coursesDurations,

  searchCoursByName,
} from '../controllers/courseController.js';

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/searchCourse', searchCoursByName);

router.get('/categories', courseCategories);
router.get('/types', coursesTypes);
router.get('/duration', coursesDurations);
router.get('/categories/name', courseCategoriesNames);

router
  .route('/')
  .get(getAllCourses)
  .post(authenticate, authorizeAdmin, createCourse);

router
  .route('/:id')
  .get(authenticate, getCourseByID)
  .patch(authenticate, authorizeAdmin, updateCourseByID)
  .delete(authenticate, authorizeAdmin, deleteCourseByID);

export default router;
