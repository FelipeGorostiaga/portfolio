

export function capitalize(str: string): string {
  if (!str && str.length === 0) {
    return "";
  }
  const firstLetter = str.charAt(0).toUpperCase();
  return firstLetter + str.slice(1);
}
