import Employer from '../models/EmployersModel.js';
import Job from '../models/jobsModel.js';
import generateToken from '../utils/create-token.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export async function createEmployer(req, res) {
  try {
    const {
      employerName,
      natureContent,
      industry,
      website,
      contactEmail,
      password,
      contactPhone,
      logo,
      description,
    } = req.body;

    const employer = await Employer.create({
      employerName,
      natureContent,
      industry,
      website,
      contactEmail,
      password,
      contactPhone,
      logo,
      description,
    });
    generateToken(res, employer._id);

    res.status(201).json({ success: true, data: employer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export const loginEmployer = asyncHandler(async (req, res) => {
  const { contactEmail, password } = req.body;
  if ((!contactEmail, !password)) {
    throw new Error('Please fill all the fields');
  }

  const currentEmployer = await Employer.findOne({ contactEmail });

  if (currentEmployer && (await currentEmployer.isPasswordValid(password))) {
    generateToken(res, currentEmployer._id);
    res.status(200).json({
      currentEmployer,
    });
  } else {
    res.status(401);
    throw new Error('You are not logged in pleas log in!');
  }
});

export const logoutCurrentEmployer = (req, res) => {
  res.cookie('jwt', ' ', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logout successfully' });
};

export async function getAllEmployers(req, res) {
  try {
    const employers = await Employer.find().populate({
      path: 'jobs',
      select: 'title minSalary maxSalary',
    });
    res.status(200).json({
      length: employers.length,
      success: true,
      data: employers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

export const getCurrentEmployerProfile = asyncHandler(async (req, res) => {
  const currentEmployer = await Employer.findById(req.user._id);
  if (currentEmployer) {
    res.status(200).json({
      _id: currentEmployer._id,
      employerName: currentEmployer.employerName,
      contactEmail: currentEmployer.contactEmail,
      contactPhone: currentEmployer.contactPhone,
    });
  } else {
    res.status(404);
    throw new Error('Employer not found!');
  }
});

export const updateCurrentEmployerProfile = asyncHandler(async (req, res) => {
  const { employerName, contactEmail, password } = req.body;
  const currentEmployer = await Employer.findById(req.user._id);

  if (currentEmployer) {
    currentEmployer.employerName = employerName || currentEmployer.employerName;
    currentEmployer.contactEmail = contactEmail || currentEmployer.contactEmail;
    if (password) {
      currentEmployer.password = password;
    }
    await currentEmployer.save();
    res.status(200).json({
      currentEmployer,
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

export async function getEmployerByID(req, res) {
  try {
    const employer = await Employer.findById(req.params.id).populate('jobs');
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, error: 'Employer not found' });
    }
    res.status(200).json({ success: true, data: employer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export async function updateEmployerByID(req, res) {
  try {
    const employer = await Employer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, error: 'Employer not found' });
    }
    res.status(200).json({
      success: 'Employes were successfully updated!',
      data: employer,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export async function deleteEmployerByID(req, res) {
  try {
    const employer = await Employer.findByIdAndDelete(req.params.id);
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, error: 'Employer not found' });
    }
    res.status(200).json({
      success: 'Employer successfully deleted!',
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
