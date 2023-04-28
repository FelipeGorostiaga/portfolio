import { type NextApiRequest, type NextApiResponse } from 'next';
import { type SentMessageInfo } from 'nodemailer';

/* eslint-disable */
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
        user: process.env.GMAIL_API_USERNAME,
        pass: process.env.GMAIL_API_PASSWORD,
      },
    });

    const mailBody = `${message} \n\n\nEmail: ${email}\n${phone ? `Phone: ${phone}` : ''}`;

    const mailOptions = {
      from: email,
      to: 'feligoros@gmail.com',
      subject: `Hey! ${name} wants to talk to you...`,
      text: mailBody,
    };

    transporter.sendMail(mailOptions, function(error: Error | null, info: SentMessageInfo) {
      if (error) {
        res.status(500).json({ errorMessage: error.message || 'Error sending email' });
      } else {
        res.status(201).json({ status: 'OK', message: info.response });
      }
    });
  }
}
