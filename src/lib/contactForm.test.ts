import { describe, expect, it, vi } from 'vitest';
import { submitContact, type SubmitDeps } from '~/lib/contactForm';

const values = { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com', message: 'Long enough message here.' };
const reply = (status: number, body: unknown = { ok: status < 300 }) =>
  Promise.resolve({ status, json: () => Promise.resolve(body) });

const deps = (over: Partial<SubmitDeps> = {}): SubmitDeps => ({
  loadValidator: () => Promise.resolve(() => ({ ok: true as const })),
  post: vi.fn(() => reply(201)),
  ...over,
});

describe('submitContact', () => {
  it('reports an error when the validation code fails to load, and sends nothing', async () => {
    const d = deps({ loadValidator: () => Promise.reject(new Error('ChunkLoadError')) });
    expect(await submitContact(values, d)).toEqual({ kind: 'error' });
    expect(d.post).not.toHaveBeenCalled();
  });

  it('returns field errors without sending when validation fails', async () => {
    const d = deps({ loadValidator: () => Promise.resolve(() => ({ ok: false as const, fieldErrors: { email: 'Enter a valid email' } })) });
    expect(await submitContact(values, d)).toEqual({ kind: 'invalid', fieldErrors: { email: 'Enter a valid email' } });
    expect(d.post).not.toHaveBeenCalled();
  });

  it('posts the values as JSON and reports success', async () => {
    const d = deps();
    expect(await submitContact(values, d)).toEqual({ kind: 'sent' });
    expect(d.post).toHaveBeenCalledWith(JSON.stringify(values));
  });

  it('shows the server field errors on a 400', async () => {
    const d = deps({ post: () => reply(400, { ok: false, fieldErrors: { message: ['At least 20 characters', 'x'] } }) });
    expect(await submitContact(values, d)).toEqual({ kind: 'invalid', fieldErrors: { message: 'At least 20 characters' } });
  });

  it('reports an error for server failures and network errors', async () => {
    expect(await submitContact(values, deps({ post: () => reply(500) }))).toEqual({ kind: 'error' });
    expect(await submitContact(values, deps({ post: () => Promise.reject(new TypeError('Failed to fetch')) }))).toEqual({
      kind: 'error',
    });
  });
});
