import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import Job from './jobsModel.js';
import JobAlert from './jobAlertModel.js';
import Course from './courseModel.js';

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email address.',
      },
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // References the Course model
      },
    ],
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: 'default-user-image.jpg',
    },
    cv: {
      type: String,
    },
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
    favoriteJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual populate for job alerts
userSchema.virtual('jobAlerts', {
  ref: 'JobAlert',
  localField: '_id',
  foreignField: 'userId',
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actualy modified
  if (!this.isModified('password')) return next();
  // Hash the password with salt of 10
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordValid = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
