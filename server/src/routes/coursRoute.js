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
  getCountOfAllCourses,
  enrollStudentInCourse,
  addLessonToCourse,
  getAllStudents,
  getCourseStats,
  getAllLessons,
} from '../controllers/courseController.js';

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();
// Enroll a student in a course
router.post('/enroll', enrollStudentInCourse);

// Add a lesson to a course
router.post('/add-lesson', addLessonToCourse);

// Get general stats: total students and total lessons across all courses
router.get('/student', getAllStudents);
router.get('/lessons', getAllLessons);

// Get stats for a specific course
router.get('/:courseId/stats', getCourseStats);

router.get('/searchCourse', searchCoursByName);

router.get('/categories', courseCategories);
router.get('/types', coursesTypes);
router.get('/duration', coursesDurations);
router.get('/categories/name', courseCategoriesNames);

router.get('/count', getCountOfAllCourses);
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
