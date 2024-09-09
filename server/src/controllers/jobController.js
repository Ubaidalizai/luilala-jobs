import Job from '../models/jobsModel.js';
import Employer from '../models/EmployersModel.js';
import CV from '../models/CV_Model.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import JobAlert from '../models/jobAlertModel.js';
import sendEmailWithMatchingJobs from '../utils/sendEmail.js';

export const checkIfJobMatchesAlert = (job, alert) => {
  return (
    (alert.titleOrKeyword && job.title.includes(alert.titleOrKeyword)) ||
    job.keyword.includes(alert.titleOrKeyword) ||
    (alert.location && job.location.includes(alert.location))
  );
};

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

export const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({});

  try {
    const jobs = await Job.find();
    res.status(200).json({
      length: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const createJob = asyncHandler(async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    const { title, keyword, location } = newJob;

    const jobAlerts = await JobAlert.find({
      location: { $regex: location, $options: 'i' },
      $or: [
        { titleOrKeyword: { $regex: title, $options: 'i' } },
        { titleOrKeyword: { $regex: keyword, $options: 'i' } },
      ],
    });

    jobAlerts.forEach(async (alert) => {
      const isMatch = checkIfJobMatchesAlert(newJob, alert);
      if (isMatch) {
        // Notify the user
        await sendEmailWithMatchingJobs(alert.email, newJob);
      }
    });

    res.status(201).json(jobAlerts);
  } catch (error) {
    throw new Error(error);
  }
});

export const getEmployerByJobId = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  if (!jobId) {
    return res.status(400).json({ error: 'JobId is required' });
  }
  const job = await Job.findOne({ _id: jobId });

  const jobs = await Employer.findOne({ _id: job.empId });

  if (!jobs) {
    return res.status(404).json({ error: 'Employer not found' });
  }

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.status(200).json({
    id: jobs.id,
    employerName: jobs.employerName,
    natureContent: jobs.natureContent,
    industry: jobs.industry,
    website: jobs.website,
    contactEmail: jobs.contactEmail,
    contactPhone: jobs.contactPhone,
    logo: jobs.logo,
    description: jobs.description,
  });
});

export const getAllLiveJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ liveTime: { $gte: new Date() } });
  res.status(200).json(jobs);
});

export const getAllLiveJobsLength = asyncHandler(async (req, res) => {
  const jobs = await Job.countDocuments({ liveTime: { $gte: Date.now() } });

  res.status(200).json(jobs);
});

export const getJobByid = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.status(200).json({
    success: true,
    data: job,
  });
});

export const getLocations = async (req, res) => {
  try {
    // Find the distinct locations for all jobs with a live time
    const locations = await Job.distinct('location', {
      liveTime: { $gte: new Date() },
    });

    res.status(200).json({
      count: locations.length,
      locations,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIndustries = async (req, res) => {
  try {
    // Find all the live jobs and populate the employer field
    const liveJobs = await Job.find({
      liveTime: { $gte: new Date() },
    }).populate('employer');

    // Create a set to store unique industries
    const industries = new Set();

    // Iterate through the live jobs and add the employer's industry to the set
    liveJobs.forEach((job) => {
      if (job.employer && job.employer.industry) {
        industries.add(job.employer.industry);
      }
    });

    // Check if the industries set is empty
    if (industries.size === 0) {
      res.status(200).json({
        message:
          'No live job postings found with associated employer industries.',
      });
    } else {
      res.status(200).json({
        count: industries.size,
        industries: Array.from(industries),
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompanys = async (req, res) => {
  try {
    const currentDate = new Date();

    const employerData = await Job.aggregate([
      {
        $match: {
          $or: [
            { liveTime: { $gte: currentDate } }, // Include active jobs
            { liveTime: { $exists: false } }, // Include jobs without liveTime field
          ],
        },
      },
      {
        $group: {
          _id: '$empId',
          employerName: { $first: '$employer.employerName' },
          activeJobs: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'employers',
          localField: '_id',
          foreignField: '_id',
          as: 'employer',
        },
      },
      {
        $unwind: '$employer',
      },
      {
        $project: {
          _id: 0,
          employerName: {
            $cond: {
              if: { $eq: ['$employer.employerName', null] },
              then: 'Unknown',
              else: '$employer.employerName',
            },
          },
          activeJobs: 1,
        },
      },
    ]);

    // Filter out employers with no active jobs
    const companiesWithActiveJobs = employerData.filter(
      ({ activeJobs }) => activeJobs > 0
    );

    const companies = companiesWithActiveJobs.map(
      ({ employerName }) => employerName.trim() || 'Unknown'
    );

    res.status(200).json({
      count: companies.length,
      Company: companies,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompanysLength = async (req, res) => {
  try {
    const currentDate = new Date();

    const employerData = await Job.aggregate([
      {
        $match: {
          $or: [
            { liveTime: { $gte: currentDate } }, // Include active jobs
            { liveTime: { $exists: false } }, // Include jobs without liveTime field
          ],
        },
      },
      {
        $group: {
          _id: '$empId',
          employerName: { $first: '$employer.employerName' },
          activeJobs: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'employers',
          localField: '_id',
          foreignField: '_id',
          as: 'employer',
        },
      },
      {
        $unwind: '$employer',
      },
      {
        $project: {
          _id: 0,
          employerName: {
            $cond: {
              if: { $eq: ['$employer.employerName', null] },
              then: 'Unknown',
              else: '$employer.employerName',
            },
          },
          activeJobs: 1,
        },
      },
    ]);

    // Filter out employers with no active jobs
    const companiesWithActiveJobs = employerData.filter(
      ({ activeJobs }) => activeJobs > 0
    );

    const companies = companiesWithActiveJobs.map(
      ({ employerName }) => employerName.trim() || 'Unknown'
    );

    res.status(200).json(companies.length);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
