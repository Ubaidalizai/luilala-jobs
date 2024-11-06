import Agency from '../models/agency_Model.js'; // Ensure correct import syntax


import Job from "../models/jobsModel.js";
// Create a new agency
export const createAgency = async (req, res) => {
    const agency = new Agency(req.body);
    try {
        const savedAgency = await agency.save();
        res.status(201).json(savedAgency);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all agencies
export const getAllAgencies = async (req, res) => {
    try {
        const agencies = await Agency.find();
        res.json({
            "Total Agencies ": agencies.length,

            "DATA" : agencies
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get an agency by ID
export const getAgencyById = async (req, res) => {
    try {
        const agency = await Agency.findById(req.params.id);
        if (!agency) return res.status(404).json({ message: 'Agency not found' });
        res.json(agency);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an agency
export const updateAgency = async (req, res) => {
    try {
        const updatedAgency = await Agency.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAgency) return res.status(404).json({ message: 'Agency not found' });
        res.json(updatedAgency);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an agency
export const deleteAgency = async (req, res) => {
    try {
        const deletedAgency = await Agency.findByIdAndDelete(req.params.id);
        if (!deletedAgency) return res.status(404).json({ message: 'Agency not found' });
        res.json({ message: 'Agency deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Controller to get top 3 agencies by job count
export const getTopAgencies =   async (req, res) => {
  try {
    const topAgencies = await Agency.aggregate([
      {
        $lookup: {
          from: "jobs", // The name of the jobs collection
          localField: "jobId", // Field from the Agency model
          foreignField: "_id", // Field from the Job model
          as: "jobs" // Output array field
        }
      },
      {
        $match: { "jobs.0": { $exists: true } } // Filter to include only agencies with jobs
      },
      {
        $group: {
          _id: "$_id", // Group by agency ID to ensure uniqueness
          name: { $first: "$name" },
          services: { $first: "$services" },
          location: { $first: "$location" },
          website: { $first: "$website" },
          email: { $first: "$email" },
          phone: { $first: "$phone" },
          teamSize: { $first: "$teamSize" },
          clients: { $first: "$clients" },
          socialMediaLinks: { $first: "$socialMediaLinks" },
          description: { $first: "$description" },
          established: { $first: "$established" },
          jobCount: { $sum: { $size: "$jobs" } } // Total job count for each agency
        }
      },
      {
        $sort: { jobCount: -1 } // Sort by job count in descending order
      },
      {
        $limit: 3 // Limit to the top 3 unique agencies
      },
      {
        $project: {
          _id: 1,
          name: 1,
          services: 1,
          location: 1,
          website: 1,
          email: 1,
          phone: 1,
          teamSize: 1,
          clients: 1,
          socialMediaLinks: 1,
          description: 1,
          established: 1,
          jobCount: 1
        }
      }
    ]);

    // Send the response
    return res.status(200).json({
      success: true,
      data: topAgencies,
    });
  } catch (error) {
    console.error("Error fetching top agencies:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
/// git by country all agencies 

// Get all unique locations from the agencies
export const getUniqueLocations = async (req, res) => {
    try {
        const locations = await Agency.distinct("location"); // Get distinct locations

        if (locations.length === 0) {
            return res.status(404).json({ message: 'No locations found' });
        }

        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




/////////////////////////// get all agency with there jobs alos 


export const getAgenciesWithJobs =  async (req, res) => {
    try {
      const agencies = await Agency.aggregate([
        {
          $lookup: {
            from: "jobs", // The name of the jobs collection
            localField: "jobId", // Field from the Agency model
            foreignField: "_id", // Field from the Job model
            as: "jobs" // Output array field
          }
        },
        {
          $unwind: "$jobs" // Unwind the jobs array to get job details
        },
        {
          $group: {
            _id: "$_id", // Group by agency ID
            name: { $first: "$name" },
            location: { $first: "$location" },
            jobCount: { $sum: 1 }, // Count jobs for the agency
            jobs: { // Aggregate job details
              $push: { 
                jobTitle: "$jobs.title", // Assuming each job has a title field
                jobLocation: "$jobs.location", // Job location field
                country: "$jobs.country" // Assuming each job has a country field
              }
            }
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            location: 1,
            jobCount: 1, // Total number of jobs for this agency
            jobs: 1 // Include job details in the output
          }
        }
      ]);
  
      // Send the response
      return res.status(200).json({
        success: true,
        "total":agencies.length,
        data: agencies,
      });
    } catch (error) {
      console.error("Error fetching agencies with jobs:", error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };