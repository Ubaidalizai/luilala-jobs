import express from 'express';
import * as agencyController from '../controllers/agency_Controller.js'; // Import all from the controller

const router = express.Router();

router.post('/agencies', agencyController.createAgency);

// Get all agencies
router.get('/agencies', agencyController.getAllAgencies);

// Get an agency by ID
router.get('/agencies/:id', agencyController.getAgencyById);

// Update an agency
router.patch('/agencies/:id', agencyController.updateAgency);

// Delete an agency
router.delete('/agencies/:id', agencyController.deleteAgency);

// get popular agencies 

router.get("/popularagencies", agencyController.getTopAgencies);
router.get("/countryagencies", agencyController.getUniqueLocations);
router.get("/agenciesWithThereJobs",agencyController.getAgenciesWithJobs);

export default router; // Use export default for ES modules