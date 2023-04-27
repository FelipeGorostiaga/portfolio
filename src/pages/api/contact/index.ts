import { NextApiRequest, NextApiResponse } from 'next';

const nodemailer = require('nodemailer');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {

    const { name, email, message, phone = '' } = req.body;

    // Gmail account info
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'feligoros@gmail.com',
        pass: process.env.GMAIL_API_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: 'feligoros@gmail.com',
      subject: `Hey! ${name} wants to talk to you...`,
      text: phone? `${message} \n\nContact me via: ${phone}` : message,
    };

    transporter.sendMail(mailOptions, function(error: any, info: any) {
      if (error) {
        console.log(error);
        res.status(500);
      } else {
        res.status(201);
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
