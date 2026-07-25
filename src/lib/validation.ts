/**
 * Basic email format regex validator.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validates minimum password strength (minimum 6 characters).
 */
export function isValidPassword(password: string): boolean {
  if (!password || typeof password !== "string") return false;
  return password.length >= 6;
}

/**
 * Sanitizes input string by trimming whitespace.
 */
export function sanitizeString(input: string): string {
  return input ? input.trim() : "";
}
