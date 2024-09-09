import Course from '../models/courseModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Create a new course
export const createCourse = asyncHandler(async (req, res) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json({
    success: true,
    data: newCourse,
  });
});

// Get all courses
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({
    count: courses.length,
    courses,
  });
});

// Get a single course
export const getCourseByID = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json(course);
});

// Update a course
export const updateCourseByID = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json(course);
});

// Delete a course
export const deleteCourseByID = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  res.status(200).json({ message: 'Course deleted' });
});

export const courseCategories = asyncHandler(async (req, res) => {
  const result = await Course.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        image: { $first: '$image' },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        count: 1,
        image: 1,
      },
    },
  ]);

  res.status(200).json({ result });
});

export const courseCategoriesNames = asyncHandler(async (req, res) => {
  const result = await Course.distinct('category');

  res.status(200).json(result);
});

export const coursesTypes = asyncHandler(async (req, res) => {
  const coursesTypes = await Course.distinct('type');

  res.status(200).json(coursesTypes);
});

export const coursesDurations = asyncHandler(async (req, res) => {
  const coursesDurations = await Course.distinct('duration');

  res.status(200).json(coursesDurations);
});
