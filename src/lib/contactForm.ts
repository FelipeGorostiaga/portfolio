// Contact helpers with no zod dependency, so the form can use them without
// pulling the schema into the home page bundle (it is loaded on first submit).

export const CONTACT_LIMITS = {
  name: 30,
  messageMin: 20,
  messageMax: 300,
  phoneMax: 20,
} as const;

export type ContactOutcome = 'sent' | 'invalid' | 'error';

/** How the contact form should react to the API's status code. */
export function contactOutcome(status: number): ContactOutcome {
  if (status === 201 || status === 200) return 'sent';
  if (status === 400) return 'invalid';
  return 'error';
}

type ValidationResult = { ok: true } | { ok: false; fieldErrors: Record<string, string> };

export type SubmitDeps = {
  /** Loads the zod validator (a separate chunk, so it can fail to load). */
  loadValidator(): Promise<(values: Record<string, string>) => ValidationResult>;
  post(body: string): Promise<{ status: number; json(): Promise<unknown> }>;
};

export type SubmitResult =
  | { kind: 'sent' }
  | { kind: 'invalid'; fieldErrors: Record<string, string> }
  | { kind: 'error' };

/** The contact form's whole submit: validate, send, and turn every failure into a result. */
export async function submitContact(values: Record<string, string>, deps: SubmitDeps): Promise<SubmitResult> {
  try {
    const validate = await deps.loadValidator();
    const result = validate(values);
    if (!result.ok) return { kind: 'invalid', fieldErrors: result.fieldErrors };

    const response = await deps.post(JSON.stringify(values));
    const outcome = contactOutcome(response.status);
    if (outcome === 'sent') return { kind: 'sent' };
    if (outcome === 'invalid') {
      const body = (await response.json().catch(() => ({}))) as { fieldErrors?: Record<string, string[]> };
      return { kind: 'invalid', fieldErrors: firstErrors(body.fieldErrors ?? {}) };
    }
    return { kind: 'error' };
  } catch {
    return { kind: 'error' };
  }
}

/** The first message of each field's error list, for showing under the input. */
export function firstErrors(fieldErrors: Record<string, string[] | undefined>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) result[field] = messages[0];
  }
  return result;
}
