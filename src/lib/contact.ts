import { z } from 'zod';

export const CONTACT_LIMITS = {
  name: 30,
  messageMin: 20,
  messageMax: 300,
  phoneMax: 20,
} as const;

const PHONE_PATTERN = /^\+?[0-9\s().-]{6,20}$/;

const nameField = z
  .string()
  .trim()
  .min(1, 'Required')
  .max(CONTACT_LIMITS.name, `Max. ${CONTACT_LIMITS.name} characters`)
  // Names end up in the mail subject, so line breaks are never allowed.
  .regex(/^[^\r\n]*$/, 'Line breaks are not allowed');

export const contactSchema = z.object({
  firstName: nameField,
  lastName: nameField,
  email: z.string().trim().email('Enter a valid email').max(254, 'Enter a valid email'),
  phone: z
    .string()
    .trim()
    .refine((value) => value === '' || PHONE_PATTERN.test(value), 'Invalid phone number')
    .optional(),
  message: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.messageMin, `At least ${CONTACT_LIMITS.messageMin} characters`)
    .max(CONTACT_LIMITS.messageMax, `Max. ${CONTACT_LIMITS.messageMax} characters`),
  // Honeypot: hidden from people, filled in by bots.
  company: z.string().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
type ContactData = z.output<typeof contactSchema>;

export type MailMessage = {
  replyTo: string;
  subject: string;
  text: string;
};

export function buildMail(input: ContactData): MailMessage {
  const name = `${input.firstName} ${input.lastName}`;
  const phoneLine = input.phone ? `\nPhone: ${input.phone}` : '';
  return {
    replyTo: input.email,
    subject: `Hey! ${name} wants to talk to you...`,
    text: `${input.message}\n\n\nEmail: ${input.email}${phoneLine}`,
  };
}

export type RateLimiter = {
  /** Records a request for `key` and returns whether it is allowed. */
  hit(key: string, now: number): boolean;
};

export function createRateLimiter(limit = 5, windowMs = 3_600_000): RateLimiter {
  const requests = new Map<string, number[]>();
  return {
    hit(key, now) {
      const recent = (requests.get(key) ?? []).filter((time) => now - time < windowMs);
      if (recent.length >= limit) {
        requests.set(key, recent);
        return false;
      }
      recent.push(now);
      requests.set(key, recent);
      return true;
    },
  };
}

export type ContactDeps = {
  send(mail: MailMessage): Promise<void>;
  limiter: RateLimiter;
  now(): number;
};

export type ContactResult = {
  status: 201 | 200 | 400 | 405 | 429 | 500;
  body: { ok: boolean; error?: string; fieldErrors?: Record<string, string[]> };
};

export type ContactOutcome = 'sent' | 'invalid' | 'error';

/** How the contact form should react to the API's status code. */
export function contactOutcome(status: number): ContactOutcome {
  if (status === 201 || status === 200) return 'sent';
  if (status === 400) return 'invalid';
  return 'error';
}

/** The first message of each field's error list, for showing under the input. */
export function firstErrors(fieldErrors: Record<string, string[] | undefined>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) result[field] = messages[0];
  }
  return result;
}

export async function handleContact(
  method: string,
  body: unknown,
  ip: string,
  deps: ContactDeps,
): Promise<ContactResult> {
  if (method !== 'POST') {
    return { status: 405, body: { ok: false, error: 'Method not allowed' } };
  }
  if (!deps.limiter.hit(ip, deps.now())) {
    return { status: 429, body: { ok: false, error: 'Too many messages, try again later' } };
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const [field, messages] of Object.entries(z.flattenError(parsed.error).fieldErrors)) {
      if (messages) fieldErrors[field] = messages;
    }
    return { status: 400, body: { ok: false, error: 'Invalid input', fieldErrors } };
  }
  if (parsed.data.company) {
    return { status: 200, body: { ok: true } };
  }

  try {
    await deps.send(buildMail(parsed.data));
  } catch {
    return { status: 500, body: { ok: false, error: 'Could not send message' } };
  }
  return { status: 201, body: { ok: true } };
}
