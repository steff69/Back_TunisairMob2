const nodemailer = require('nodemailer');

// Nodemailer
const sendEmail = async (email , otp) => {
  // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define email options (like from, to, subject, email content)
  const mailOpts = {
    from: 'Foodly >',
    to: email,
    subject: 'Foodly Verification Code',
    html : `<h1> Foodly Email Verification </h1>
    <p>  Your verification code is:</p>
    <h2  style = " color : blue"  > ${otp}</h2>
    
   <p> please enter this code on the verification page to complete your registration</p>`
   
  };

  // 3) Send email
  await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;
