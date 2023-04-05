import { type ZodString } from 'zod';

export function capitalize(str: string): string {
  if (!str && str.length === 0) {
    return '';
  }
  const firstLetter = str.charAt(0).toUpperCase();
  return firstLetter + str.slice(1);
}

export function validateInput(value: any, schema: ZodString): boolean {
  const parseResult = schema.safeParse(value);
  return parseResult.success;
}
