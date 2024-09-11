import nodemailer from 'nodemailer';

// Function to send an email with matching jobs to the user
async function sendEmailWithMatchingJobs(userEmail, jobs) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fazalullahrasoli10@gmail.com',
      pass: 'prklwldhzdbyhavf',
    },
  });

  let jobDetails = [];
  let jobTitle = '';
  if (Array.isArray(jobs)) {
    jobDetails = jobs
      .map(
        (job) => `
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <p>Location: ${job.location}</p>
        <p>Posted on: ${job.liveTime}</p>`
      )
      .join('<br/>');
    jobTitle = jobs[0].title;
  } else {
    jobDetails = `
        <h3>${jobs.title}</h3>
        <p>${jobs.description}</p>
        <p>Location: ${jobs.location}</p>
        <p>Posted on: ${jobs.liveTime}</p>`;
    jobTitle = jobs.title;
  }

  const mailOptions = {
    from: 'fazalullahrasoli10@gmail.com',
    to: userEmail,
    subject: 'New Jobs Matching Your Alert',
    html: `
      <h2>Jobs Matching Your Alert: ${jobTitle}</h2>
      ${jobDetails}
    `,
  };

  await transporter.sendMail(mailOptions);
}

export default sendEmailWithMatchingJobs;
