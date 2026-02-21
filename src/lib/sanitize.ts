/**
 * Input sanitization utilities to prevent XSS and injection attacks
 */

/**
 * Sanitize string to prevent XSS attacks
 * Removes or escapes potentially dangerous HTML characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .replace(/[<>]/g, (char) => {
      const map: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
      };
      return map[char] || char;
    });
}

/**
 * Sanitize object properties recursively
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    const value = sanitized[key];
    if (typeof value === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeString(value);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }

  return sanitized;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Truncate string to max length
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + "...";
}

/**
 * Remove special characters while keeping alphanumeric and specific safe characters
 */
export function removeSpecialCharacters(
  input: string,
  allowedChars: string = "a-zA-Z0-9 -_."
): string {
  const regex = new RegExp(`[^${allowedChars}]`, "g");
  return input.replace(regex, "");
}

/**
 * Validate search query to prevent injection
 */
export function validateSearchQuery(query: string, minLength: number = 1, maxLength: number = 100): boolean {
  if (typeof query !== "string") return false;
  const trimmed = query.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

/**
 * Escape special regex characters
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Validate slug format (alphanumeric, hyphens only)
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Sanitize file names to prevent path traversal attacks
 */
export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/\.\./g, "") // Remove ..
    .replace(/[/\\]/g, "") // Remove path separators
    .replace(/[<>:"|?*]/g, "") // Remove invalid filename characters
    .substring(0, 255); // Limit length
}

/**
 * Validate and sanitize pagination parameters
 */
export function validatePaginationParams(
  page: unknown,
  limit: unknown,
  maxLimit: number = 100
): { page: number; limit: number } {
  const pageNum = Math.max(1, Math.min(parseInt(String(page)) || 1, 999999));
  const limitNum = Math.max(1, Math.min(parseInt(String(limit)) || 10, maxLimit));

  return { page: pageNum, limit: limitNum };
}
