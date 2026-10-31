import { type NextApiRequest, type NextApiResponse } from 'next';
import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '~/env.mjs';
import { createRateLimiter, handleContact, type MailMessage } from '~/lib/contact';

export const config = {
  api: { bodyParser: { sizeLimit: '16kb' } },
};

// Best-effort: lives per server instance, so serverless instances don't share it.
const limiter = createRateLimiter();
let transport: Transporter | undefined;

async function send(mail: MailMessage): Promise<void> {
  const user = env.GMAIL_API_USERNAME;
  const pass = env.GMAIL_API_PASSWORD;
  if (!user || !pass) {
    if (env.NODE_ENV === 'production') {
      throw new Error('Gmail credentials are not configured');
    }
    console.info('[contact] dev mail', mail);
    return;
  }
  transport ??= nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
  await transport.sendMail({ from: user, to: user, ...mail });
}

function clientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim();
  return first || req.socket.remoteAddress || 'unknown';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await handleContact(req.method ?? '', req.body, clientIp(req), {
    send,
    limiter,
    now: Date.now,
  });
  if (result.status === 405) {
    res.setHeader('Allow', 'POST');
  }
  res.status(result.status).json(result.body);
}
