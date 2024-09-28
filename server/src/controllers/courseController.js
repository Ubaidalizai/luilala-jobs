import Course from '../models/courseModel.js';
import Lesson from '../models/LessonsModule.js';
import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

//Search courses

// Search and sort courses based on query parameters
export const searchCourses1 = async (req, res) => {
  try {
    const { sortBy, category, searchQuery } = req.query;

    // Build query object
    const query = {};
    if (category) query.category = category;
    if (searchQuery) query.name = { $regex: searchQuery, $options: 'i' }; // Case-insensitive search

    // Sort options
    const sortOptions = {
      'Price (high to low)': { price: -1 },
      'Price (low to high)': { price: 1 },
      'Rating (high to low)': { ratingAverage: -1 },
      'Rating (low to high)': { ratingAverage: 1 },
      'Release Date': { createdAt: -1 },
      'Name A-Z': { name: 1 },
      'Name Z-A': { name: -1 },
      'Duration (short to long)': { duration: 1 },
      'Duration (long to short)': { duration: -1 },
    };

    const sort = sortOptions[sortBy] || {};

    // Fetch courses with filtering and sorting
    const courses = await Course.find(query).sort(sort);

    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

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
//Get count of all courses
export const getCountOfAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.countDocuments();
  res.status(200).json(courses);
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

export const searchCoursByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res
        .status(400)
        .json({ message: 'Course name is required for search' });
    }

    // Use a regular expression to perform a case-insensitive search
    const courses = await Course.find({
      name: { $regex: name, $options: 'i' },
    });

    res.status(200).json({ count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

//EnrollStudentInCourse

// Enroll a student in a course
export const enrollStudentInCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Find the user and course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or Course not found' });
    }

    // Check if the user is already enrolled in the course
    if (user.enrolledCourses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: 'User already enrolled in this course' });
    }

    // Add course to user's enrolledCourses
    user.enrolledCourses.push(courseId);
    await user.save();

    // Optionally, you can add the user to the course's students array if you have one
    course.studentsEnrolled.push(userId);
    await course.save();

    return res.status(200).json({
      message: 'Student enrolled in course successfully',
      user,
      course,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error enrolling student in course', error });
  }
};

// Add a lesson to a course
export const addLessonToCourse = async (req, res) => {
  const { courseId, title, duration } = req.body;

  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create a new lesson
    const newLesson = new Lesson({
      title,
      duration,
      course: courseId, // Link lesson to the course
    });

    // Save the lesson to the database
    await newLesson.save();

    // Add the lesson to the course's lessons array
    course.lessons.push(newLesson._id);
    await course.save();

    return res.status(200).json({
      message: 'Lesson added to course successfully',
      lesson: newLesson,
      course,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error adding lesson to course', error });
  }
};

// Get total students enrolled and total lessons in a specific course
export const getCourseStats = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find the course by ID
    const course = await Course.findById(courseId).populate('lessons');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Fetch the number of students enrolled in the specific course
    const totalStudents = await User.countDocuments({
      enrolledCourses: courseId,
    });

    // Get the total number of lessons in the course
    const totalLessons = course.lessons.length;

    // Return general stats in JSON format for the specific course
    return res.status(200).json({
      courseTitle: course.title,
      totalStudents,
      totalLessons,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching course stats', error });
  }
};

// Get general stats for all courses (total students and lessons)
export const getAllLessons = async (req, res) => {
  try {
    // Fetch the total number of lessons across all courses
    const totalLessons = await Lesson.countDocuments();

    // Return general stats in JSON format
    return res.status(200).json(totalLessons);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching general stats', error });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    // Fetch all users who have enrolled in any courses (count distinct users with enrolledCourses)
    const totalStudents = await User.countDocuments({
      enrolledCourses: { $exists: true, $not: { $size: 0 } },
    });
    // Return general stats in JSON format
    return res.status(200).json(totalStudents);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching general stats', error });
  }
};
