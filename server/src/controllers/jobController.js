import Job from '../models/jobsModel.js';
import Employer from '../models/EmployersModel.js';
import CV from '../models/CV_Model.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import path from 'path';
import { count } from 'console';

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

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json(job);
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

export const getEmployerByJobId = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  if (!jobId) {
    return res.status(400).json({ error: 'JobId is required' });
  }
  const job = await Job.findOne({ _id: jobId });

  const employer = await Employer.findOne({ _id: job.empId });

  if (!employer) {
    return res.status(404).json({ error: 'Employer not found' });
  }

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.status(200).json({
    id: employer.id,
    employerName: employer.employerName,
    natureContent: employer.natureContent,
    industry: employer.industry,
    website: employer.website,
    contactEmail: employer.contactEmail,
    contactPhone: employer.contactPhone,
    logo: employer.logo,
    description: employer.description,
  });
});

export const getAllLiveJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ liveTime: { $gte: Date.now() } });

  res.status(200).json({
    id: employer.id,
    employerName: employer.employerName,
    natureContent: employer.natureContent,
    industry: employer.industry,
    website: employer.website,
    contactEmail: employer.contactEmail,
    contactPhone: employer.contactPhone,
    logo: employer.logo,
    description: employer.description,
  });
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

// export const getLocations = async (req, res) => {
//   const locations = await Job.distinct('location');
//   res.status(200).json({
//     length: locations.length,
//     locations,
//   });
// };
export const getLocations = async (req, res) => {
  try {
    // Find the locations for all live job postings
    const locations = await Job.distinct('location', { status: 'live' });

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
    const liveJobs = await Job.find({ status: 'live' }).populate('employer');

    // Create a set to store unique industries
    const industries = new Set();

    // Iterate through the live jobs and add the employer's industry to the set
    liveJobs.forEach((job) => {
      if (job.employer && job.employer.industry) {
        industries.add(job.employer.industry);
      }
    });

    res.status(200).json({
      count: industries.size,
      industries: Array.from(industries),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// export const getIndustries = async (req, res) => {
//   try {
//     // Find all the jobs and populate the employer field
//     const jobs = await Job.find().populate('employer');

//     // Create a set to store unique industries
//     const industries = new Set();

//     // Iterate through the jobs and add the employer's industry to the set
//     jobs.forEach((job) => {
//       if (job.employer && job.employer.industry) {
//         industries.add(job.employer.industry);
//       }
//     });

//     res.status(200).json({
//       count: industries.size,
//       industries: Array.from(industries),
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getCompanys = async (req, res) => {
//   const employer = await Employer.distinct('employerName');
//   res.status(200).json({
//     count: employer.length,
//     employer,
//   });
// };
export const getCompanys = async (req, res) => {
  try {
    // Fetch all employers with live job postings
    const employerJobPostings = await Employer.aggregate([
      {
        $match: { status: 'live' },
      },
      {
        $group: {
          _id: '$employerName',
          count: { $count: {} },
        },
      },
      {
        $project: {
          _id: 0,
          employerName: '$_id',
          count: 1,
        },
      },
    ]);

    res.status(200).json(employerJobPostings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
