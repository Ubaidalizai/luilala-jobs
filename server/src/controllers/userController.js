import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import User from '../models/userModel.js';

import asyncHandler from '../middlewares/asyncHandler.js';
import generateToken from '../utils/create-token.js';

// Multer setup
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const __dirname = path.resolve();
const dir = path.join(__dirname, 'public/img/users');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  try {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);
  } catch (error) {
    throw new Error(error);
  }
  next();
});

const updateUserPhoto = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      image: req.file.filename,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const createUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, isAdmin, image } = req.body;

  if ((!fullName || !email, !password)) {
    throw new Error('Please fill all the fields');
  }

  const userExist = await User.findOne({ email });
  if (userExist) throw new Error('User already exist');

  const currentUser = new User({ fullName, email, password, image });
  try {
    await currentUser.save();

    generateToken(res, currentUser._id);
    res.status(201).json({
      _id: currentUser._id,
      fullName: currentUser.fullName,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
      image: currentUser.image,
    });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    throw new Error('Please fill all the fields');
  }

  const currentUser = await User.findOne({ email });

  if (currentUser && (await currentUser.isPasswordValid(password))) {
    generateToken(res, currentUser._id);
    res.status(200).json({
      _id: currentUser._id,
      fullName: currentUser.fullName,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('You are not logged in pleas log in!');
  }
});

const logoutCurrentUser = (req, res) => {
  res.cookie('jwt', ' ', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logout successfully' });
};

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json({
    length: users.length,
    users,
  });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);

  if (currentUser) {
    res.status(200).json({
      _id: currentUser._id,
      fullName: currentUser.fullName,
      email: currentUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const currentUser = await User.findById(req.user._id);

  if (currentUser) {
    currentUser.fullName = fullName || currentUser.fullName;
    currentUser.email = email || currentUser.email;
    if (password) {
      currentUser.password = password;
    }

    await currentUser.save();
    res.status(200).json({
      fullName: currentUser.fullName,
      email: currentUser.email,
      password: currentUser.password,
    });
  }
});

const findUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('jobAlerts');

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('USer not found!');
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const { fullName, email, isAdmin } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.isAdmin = Boolean(isAdmin);

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

const deleteUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete user as admin!');
    }

    await User.deleteOne({ _id: user._id });
    res.status(204).json({ message: 'User removed successfully' });
  } else {
    res.status(404).json({ message: 'User not found!' });
  }
});

const applyJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user;

  const user = await User.findById({ _id: userId });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Check if the user already has a CV
  if (!user.cv && !req.file) {
    res.status(400);
    throw new Error(
      'No CV uploaded. Please upload your CV to apply for the job.'
    );
  }

  // Save the uploaded CV path to the user's profile if a new CV is uploaded
  if (req.file) {
    user.cv = req.file.path;
    await user.save();
  }

  // Proceed with job application logic
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404);
    throw new Error('Job not found');
  }

  if (user.appliedJobs.includes(jobId)) {
    res.status(400);
    throw new Error('You have already applied for this job.');
  }

  // Add job ID to user's applied jobs list
  user.appliedJobs.push(jobId);

  await user.save();

  res.status(200).json({ message: 'Job application successful' });
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  uploadUserPhoto,
  resizeUserPhoto,
  updateUserPhoto,
  findUserByID,
  deleteUserByID,
  updateUserById,
  applyJob,
};
