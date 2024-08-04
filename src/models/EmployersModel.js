import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const employerSchema = mongoose.Schema(
  {
    employerName: {
      type: String,
      required: [true, 'Please provide company name'],
      unique: [true, 'Provided employer name already exist'],
    },
    contactEmail: {
      type: String,
      required: [true, 'Please provide contact email'],
      unique: [true, 'Provided contact email already exist'],
    },
    password: {
      type: String,
      require: [true, 'Password is required!'],
    },
    contactPhone: {
      type: String,
      required: [true, 'Please provide contact phone number'],
      unique: [true, 'Provided contact phone number already exist'],
    },
    natureContent: {
      type: String,
      required: [true, 'Please provide company nature'],
    },
    industry: {
      type: String,
      required: [true, 'Please provide industry'],
    },
    website: {
      type: String,
      required: [true, 'Please provide company website'],
    },
    logo: {
      type: String,
      required: [true, 'Please provide company logo'],
      default: 'default-company-logo.png',
    },
    description: {
      type: String,
      required: [true, 'Please provide company description'],
    },
  },
  { timestamps: true }
);

employerSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with salt of 10
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

employerSchema.methods.isPasswordValid = async function (employerPassword) {
  return await bcrypt.compare(employerPassword, this.password);
};

const Employer = mongoose.model('Employer', employerSchema);
export default Employer;
