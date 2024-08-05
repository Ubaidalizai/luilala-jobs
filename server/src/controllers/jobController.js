import Job from '../models/jobsModel.js';
import Employer from '../models/EmployersModel.js';
import CV from '../models/CV_Model.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const findJobs = async (req, res) => {
  try {
    const {
      title,
      keyword,
      country,
      city,
      minSalary,
      maxSalary,
      jobType,
      salaryType,
      industry,
      location,
      company,
    } = req.query;
    const queryObject = {};

    if (title) {
      queryObject.title = { $regex: title, $options: 'i' };
    }

    if (keyword) {
      queryObject.keyword = { $regex: keyword, $options: 'i' };
    }

    if (country) {
      queryObject.country = { $regex: country, $options: 'i' };
    }

    if (city) {
      queryObject.city = { $regex: city, $options: 'i' };
    }

    if (minSalary) {
      queryObject.minSalary = { $gte: minSalary };
    }

    if (maxSalary) {
      queryObject.maxSalary = { $lte: maxSalary };
    }

    if (jobType) {
      queryObject.jobType = { $regex: jobType, $options: 'i' };
    }

    if (salaryType) {
      queryObject.salaryType = { $regex: salaryType, $options: 'i' };
    }

    if (industry) {
      queryObject.industry = { $regex: industry, $options: 'i' };
    }

    if (location) {
      queryObject.location = { $regex: location, $options: 'i' };
    }

    if (company) {
      queryObject.company = { $regex: company, $options: 'i' };
    }

    const jobs = await find(queryObject);
    res.status(200).json({
      length: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// This function FOR to get all industry jobs
export const getIndustries = async (req, res) => {
  const industries = await Employer.distinct('industry');
  res.status(200).json({
    length: industries.length,
    industries,
  });
};
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
};
export const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json({
    count: jobs.length,
    jobs,
  });
});
export const getCompanys = async (req, res) => {
  const companys = await CV.distinct('company');
  res.status(200).json({
    length: companys.length,
    companys,
  });
};

export const getLocations = async (req, res) => {
  const locations = await Job.distinct('location');
  res.status(200).json({
    length: locations.length,
    locations,
  });
};