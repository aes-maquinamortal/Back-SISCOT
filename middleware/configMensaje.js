const nodemailer = require('nodemailer');
module.exports = (email, asunto, mensaje) => {
   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'mailer.nodejs2019@gmail.com', // Cambialo por tu email
         pass: 'mailer.2019' // Cambialo por tu password
      }
   });

   const mailOptions = {
      from: 'mailer.nodejs2019@gmail.com',
      to: `${email}`, // Cambia esta parte por el destinatario
      subject: asunto,
      html: `${mensaje}`
   };

   transporter.sendMail(mailOptions, function (err, info) {
      if (err)
         console.log(`Error: ${err.message}`);
   });
};