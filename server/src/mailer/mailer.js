
  import nodemailer from 'nodemailer';
  require('dotenv').config();
  
  export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  export const mailOptions = (to, bcc, subject, html) => ({
    from: 'Mailer from library.com',
    to,
    bcc,
    subject,
    html,
  });
