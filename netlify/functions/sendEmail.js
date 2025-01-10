const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { name, email, phone, message } = JSON.parse(event.body);

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Setup email data
  let mailOptions = {
    from: `"${name}" <${email}>`, // sender address
    to: 'biswas.khayargoli@gmail.com', // list of receivers
    subject: 'New Message from Contact Form', // Subject line
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`, // plain text body
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: 'Email sent successfully!',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Failed to send email: ${error.message}`,
    };
  }
}; 