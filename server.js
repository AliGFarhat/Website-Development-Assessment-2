const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/subscribe', async (req, res) => {
  const userEmail = req.body.email;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Thank you for subscribing!',
    text: 'You have successfully subscribed to our newsletter.',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail}`);
    res.send('<h1>Thank you for subscribing!</h1>'); // Respond with a success message
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('<h1>Failed to send email. Please try again later.</h1>'); // Respond with an error message
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/Bleach.html`);
});