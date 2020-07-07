import * as nodemailer from 'nodemailer';
export const sendEmail = async(userEmail: string, link: string) => {


  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ADMIN_EMAIL,
      pass: process.env.MAIL_ADMIN_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_ADMIN_EMAIL, 
    to: userEmail, 
    subject: "Change your password", 
    text: "Change your password?",
    html: `<b>Change your password, click <a href="${link}">here</a> </b>`,
  });

}
