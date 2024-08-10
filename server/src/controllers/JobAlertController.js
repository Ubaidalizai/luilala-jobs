import JobAlert from '../models/jobAlertModel.js';
import User from '../models/userModel.js';

export const createJobAlert = async (req, res) => {
  try {
    const { title, keywords, location, email, userId } = req.body;
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
    res.status(201).json(newAlert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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
