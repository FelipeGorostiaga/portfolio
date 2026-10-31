import { describe, expect, it, vi } from 'vitest';
import {
  buildMail,
  contactSchema,
  createRateLimiter,
  handleContact,
  type ContactDeps,
} from '~/lib/contact';

const valid = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  phone: '',
  message: 'I would love to talk about engines.',
  company: '',
};

const deps = (over: Partial<ContactDeps> = {}): ContactDeps => ({
  send: vi.fn().mockResolvedValue(undefined),
  limiter: createRateLimiter(),
  now: () => 0,
  ...over,
});

describe('contactSchema', () => {
  it('accepts a valid message', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a whitespace-only message', () => {
    expect(contactSchema.safeParse({ ...valid, message: ' '.repeat(40) }).success).toBe(false);
  });

  it('rejects line breaks in names', () => {
    expect(contactSchema.safeParse({ ...valid, firstName: 'Ada\nBcc: x@y.z' }).success).toBe(false);
  });

  it('rejects names over 30 characters', () => {
    expect(contactSchema.safeParse({ ...valid, lastName: 'x'.repeat(31) }).success).toBe(false);
  });

  it('accepts a formatted phone and rejects letters', () => {
    expect(contactSchema.safeParse({ ...valid, phone: '+54 9 11 1234-5678' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, phone: 'call me' }).success).toBe(false);
  });

  it('rejects messages over 300 characters', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(301) }).success).toBe(false);
  });
});

describe('buildMail', () => {
  it('replies to the visitor and names them in the subject', () => {
    const mail = buildMail(contactSchema.parse(valid));
    expect(mail.replyTo).toBe('ada@example.com');
    expect(mail.subject).toBe('Hey! Ada Lovelace wants to talk to you...');
    expect(mail.text).toContain('Email: ada@example.com');
    expect(mail.text).not.toContain('Phone:');
  });

  it('adds the phone line when given', () => {
    const mail = buildMail(contactSchema.parse({ ...valid, phone: '+54 11 1234 5678' }));
    expect(mail.text).toContain('Phone: +54 11 1234 5678');
  });
});

describe('handleContact', () => {
  it('rejects non-POST with 405', async () => {
    expect((await handleContact('GET', valid, '1.1.1.1', deps())).status).toBe(405);
  });

  it('returns 400 with field errors for invalid input and sends nothing', async () => {
    const d = deps();
    const res = await handleContact('POST', { ...valid, email: 'nope' }, '1.1.1.1', d);
    expect(res.status).toBe(400);
    expect(res.body.fieldErrors?.email).toBeDefined();
    expect(d.send).not.toHaveBeenCalled();
  });

  it('silently drops honeypot submissions', async () => {
    const d = deps();
    const res = await handleContact('POST', { ...valid, company: 'Spam Inc' }, '1.1.1.1', d);
    expect(res.status).toBe(200);
    expect(d.send).not.toHaveBeenCalled();
  });

  it('sends and returns 201', async () => {
    const d = deps();
    expect((await handleContact('POST', valid, '1.1.1.1', d)).status).toBe(201);
    expect(d.send).toHaveBeenCalledOnce();
  });

  it('hides transport errors behind a generic 500', async () => {
    const send = vi.fn().mockRejectedValue(new Error('535 bad creds'));
    const res = await handleContact('POST', valid, '1.1.1.1', deps({ send }));
    expect(res).toEqual({ status: 500, body: { ok: false, error: 'Could not send message' } });
  });

  it('limits each IP to 5 requests per hour', async () => {
    let t = 0;
    const d = deps({ now: () => t });
    for (let i = 0; i < 5; i++) {
      expect((await handleContact('POST', valid, '1.1.1.1', d)).status).toBe(201);
    }
    expect((await handleContact('POST', valid, '1.1.1.1', d)).status).toBe(429);
    expect((await handleContact('POST', valid, '2.2.2.2', d)).status).toBe(201);
    t = 3_600_001;
    expect((await handleContact('POST', valid, '1.1.1.1', d)).status).toBe(201);
  });
});
