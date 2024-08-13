import nodemailer from 'nodemailer';
import JobAlert from '../models/jobAlertModel.js';
import User from '../models/userModel.js';
import Job from '..//models/jobsModel.js';
export const createJobAlert = async (req, res) => {
  try {
    const { title, keywords, location, email } = req.body;
    const userId = req.user._id; // Assuming userId is stored in req.user from the authentication middleware

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if a job alert with the same title and user ID already exists
    const existingAlert = await JobAlert.findOne({ title, userId: user._id });
    if (existingAlert) {
      return res
        .status(400)
        .json({ error: 'Job alert with the same title already exists' });
    }

    const newAlert = new JobAlert({
      title,
      keywords,
      location,
      email,
      userId: user._id,
    });

    await newAlert.save();

    // Check for matching live jobs
    const matchingJobs = await matchLiveJobs(
      title,
      location,
      keywords.split(',')
    );

    if (matchingJobs.length > 0) {
      // Send email to user about the matching jobs
      await sendEmailWithMatchingJobs(user.email, matchingJobs);

      return res.status(201).json({
        alert: newAlert,
        matchingJobs,
        message:
          'Job alert created and matching jobs found. Email sent to user.',
      });
    } else {
      return res.status(201).json({
        alert: newAlert,
        message: 'Job alert created, but no matching jobs found.',
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Function to match live jobs based on job alert criteria
async function matchLiveJobs(title, location, keywords) {
  const jobs = await Job.find({
    title: { $regex: new RegExp(title, 'i') },
    $or: [
      { location: { $regex: new RegExp(location, 'i') } },
      { city: { $regex: new RegExp(location, 'i') } },
      { country: { $regex: new RegExp(location, 'i') } },
    ],
    $or: [
      { keyword: { $regex: new RegExp(keywords.join('|'), 'i') } },
      { city: { $regex: new RegExp(keywords.join('|'), 'i') } },
      { location: { $regex: new RegExp(keywords.join('|'), 'i') } },
    ],
    liveTime: { $gte: new Date() },
  });

  return jobs;
}

// Function to send an email with matching jobs to the user
async function sendEmailWithMatchingJobs(userEmail, jobs) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fazalullahrasoli10@gmail.com',
      pass: 'prklwldhzdbyhavf',
    },
  });

  const jobDetails = jobs
    .map(
      (job) => `
    <h3>${job.title}</h3>
    <p>${job.description}</p>
    <p>Location: ${job.location}</p>
    <p>Posted on: ${job.liveTime}</p>
  `
    )
    .join('<br/>');

  const mailOptions = {
    from: 'fazalullahrasoli10@gmail.com',
    to: userEmail,
    subject: 'New Jobs Matching Your Alert',
    html: `
      <h2>Jobs Matching Your Alert: ${jobs[0].title}</h2>
      ${jobDetails}
    `,
  };

  await transporter.sendMail(mailOptions);
}

export const getAllJobAlerts = async (req, res) => {
  try {
    // const { userId } = req.query;
    const alerts = await JobAlert.find();
    res.status(200).json({
      count: alerts.length,
      alerts,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllJobAlertsForUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user contains the authenticated user's details

    const jobAlerts = await JobAlert.find({ userId });

    res.status(200).json({
      count: jobAlerts.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
export const getJobAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await JobAlert.findById(id);

    if (!alert) {
      return res.status(404).json({ error: 'Job alert not found' });
    }

    res.status(200).json(alert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateJobAlert = async (req, res) => {
  const { id } = req.params; // Get the ID from the route parameters
  const updateData = req.body; // Get the update data from the request body

  try {
    // Update the JobAlert document by its ID
    const updatedJobAlert = await JobAlert.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedJobAlert) {
      return res.status(404).json({ message: 'Job alert not found' });
    }

    res.status(200).json(updatedJobAlert);
  } catch (error) {
    // Handle errors and respond with an appropriate status code
    console.error('Error updating job alert:', error.message);
    res
      .status(500)
      .json({ message: 'Failed to update job alert', error: error.message });
  }
};
export const deleteJobAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await JobAlert.findByIdAndDelete(id);

    if (!alert) {
      return res.status(404).json({ error: 'Job alert not found' });
    }

    res.status(204).json();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
