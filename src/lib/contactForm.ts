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

/** The first message of each field's error list, for showing under the input. */
export function firstErrors(fieldErrors: Record<string, string[] | undefined>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) result[field] = messages[0];
  }
  return result;
}
