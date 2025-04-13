// agendaa.js
// require('dotenv').config({ path: '../.env' });
require('dotenv').config();

const nodemailer = require('nodemailer');
const { Agenda } = require('agenda');

// Setup Agenda with MongoDB
const agenda = new Agenda({
  db: { address: process.env.MONGO_URL, collection: 'jobs' }
});

// Define the job: what to do when the time comes
agenda.define('send-scheduled-email', async (job) => {
  const { email, subject, message } = job.attrs.data;

  // Checkpoint: Display email data
  console.log('Job Data:', { email, subject, message });

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email}`);
  } catch (err) {
    console.error('Error sending email:', err);
  }
});

// Start Agenda and schedule job
const scheduleEmail = async (email, subject, message, sendAt) => {
  try {
    await agenda.start();
    console.log('Agenda started');

    // Schedule the email job with the specified time
    await agenda.schedule(sendAt, 'send-scheduled-email', {
      email: email,
      subject: subject,
      message: message
    });

    console.log(`Email job scheduled for ${sendAt.toLocaleString()}`);
  } catch (err) {
    console.error('Error in scheduling process:', err);
  }
};

// Export the scheduleEmail function for use in other files
module.exports = { scheduleEmail };
