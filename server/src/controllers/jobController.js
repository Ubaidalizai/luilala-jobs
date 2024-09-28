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

import path from 'path';
import { count } from 'console';
import User from '../models/userModel.js';

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
      industry, // Industry from employer schema
      location,
      company,
      postedIn, // Posted in: Last 10, 20, 30 days
      sortBy, // Sorting options
    } = req.query;

    const queryObject = {};

    // Add filters dynamically based on the request query
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

    if (location) {
      queryObject.location = { $regex: location, $options: 'i' };
    }

    if (company) {
      queryObject.company = { $regex: company, $options: 'i' };
    }

    // Posted In: Filter by liveTime (posted within the last X days)
    if (postedIn) {
      const daysAgo = parseInt(postedIn, 10); // Convert postedIn value to an integer (e.g., "10" for Last 10 Days)
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - daysAgo); // Calculate the date X days ago
      queryObject.liveTime = { $gte: dateThreshold }; // Filter jobs posted within the specified timeframe
    }

    // Define default sorting logic
    let sortObject = {}; // Empty for default (relevance-based sorting)

    // Sorting options
    if (sortBy) {
      switch (sortBy) {
        case 'Date Posted':
          sortObject = { liveTime: -1 }; // Most recent jobs first
          break;
        case 'Salary':
          sortObject = { maxSalary: -1 }; // Highest salary first
          break;
        case 'Company Name':
          sortObject = { 'empId.employerName': 1 }; // Sort alphabetically by company name
          break;
        case 'Relevance':
        default:
          sortObject = { createdAt: -1 }; // Default to relevance or newest jobs first
          break;
      }
    }

    // Fetch jobs and filter by industry from the employer model
    const jobs = await Job.find(queryObject)
      .populate({
        path: 'empId',
        select: 'employerName logo industry',
        match: industry
          ? { industry: { $regex: industry, $options: 'i' } }
          : {}, // Filter jobs by employer's industry
      })
      .sort(sortObject) // Apply sorting logic
      .exec();

    // Filter out jobs that don't have a matched employer industry (in case no match is found during populate)
    const filteredJobs = jobs.filter((job) => job.empId);

    // Calculate the number of days since the job was posted
    const getDaysAgo = (date) => {
      const today = new Date();
      const postedDate = new Date(date);
      const diffTime = today - postedDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
      return diffDays;
    };

    // Prepare response with formatted postedTime
    const responseJobs = filteredJobs.map((job) => ({
      ...job._doc,
      postedTime: job.liveTime
        ? `Last ${getDaysAgo(job.liveTime)} days`
        : 'No live time', // Format liveTime
    }));

    res.status(200).json({
      length: responseJobs.length,
      jobs: responseJobs,
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
      res.status(200).json(Array.from(industries));
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// This for search part
export const getIndustriess = async (req, res) => {
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
        indestres: Array.from(industries),
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

const trendingJobs = [
  'Artificial Intelligence (AI) Specialist',
  'Data Scientist',
  'Cybersecurity Specialist',
  'Cloud Computing Engineer',
  'Full Stack Developer',
  'Digital Marketing Specialist',
  'Health Informatics Specialist',
  'Renewable Energy Engineer',
  'UX/UI Designer',
  'Supply Chain Management Specialist',
];

export const getAllTrending = asyncHandler(async (req, res) => {
  // Find all jobs that are live (with liveTime greater than or equal to current time)
  const jobs = await Job.find({ liveTime: { $gte: Date.now() } });

  // Filter the jobs to include only those with titles in the trendingJobs array
  const trendingLiveJobTitles = jobs
    .filter((job) => trendingJobs.includes(job.title))
    .map((job) => job.title); // Extract only the title of each job

  // Return the list of trending job titles
  res.status(200).json(trendingLiveJobTitles);
});
