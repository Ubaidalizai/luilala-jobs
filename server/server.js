// packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRouts from './src/routes/userRouts.js';
import courseRoute from './src/routes/coursRoute.js';
import employerRoute from './src/routes/EmployerRoute.js';
import jobRoute from './src/routes/jobsRouts.js';
import jobAlertRoute from './src/routes/jobAlertRoute.js';

// utils
import connectDB from './src/config/db.js';
connectDB();

const app = express();

// Middleware to parse cookie
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your React app's URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

// Use the CORS middleware with options
app.use(cors(corsOptions));

app.use('/api/v1/users', userRouts);
app.use('/api/v1/cours', courseRoute);
app.use('/api/v1/employer', employerRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/jobAlert', jobAlertRoute);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`server is running on port ${port}...`));
