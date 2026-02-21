/**
 * Environment variable validation and access
 * Centralizes all environment variable handling for type-safety and validation
 */

const requiredEnvVars = [
  "DATABASE_URL",
  "NEXT_PUBLIC_API_URL",
] as const;

type OptionalEnvVar = 
  | "RESEND_API_KEY"
  | "CONTACT_EMAIL_RECIPIENT"
  | "GCS_BUCKET_NAME"
  | "CLERK_SECRET_KEY"
  | "CLERK_PUBLISHABLE_KEY"
  | "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
  | "SKIP_IMAGE_OPTIMIZATION";

/**
 * Validates that all required environment variables are defined
 * Should be called on server startup
 */
export function validateEnvironment() {
  const missing: string[] = [];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

/**
 * Safe environment variable access for required variables
 */
export const env = {
  /* Required Variables */
  DATABASE_URL: process.env.DATABASE_URL || "",
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  NODE_ENV: (process.env.NODE_ENV || "development") as "development" | "production" | "test",

  /* Optional Variables with Safe Defaults */
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
  CONTACT_EMAIL_RECIPIENT: process.env.CONTACT_EMAIL_RECIPIENT || "support@clinic.local",
  GCS_BUCKET_NAME: process.env.GCS_BUCKET_NAME || "clinic-images",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
  CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
  SKIP_IMAGE_OPTIMIZATION: process.env.SKIP_IMAGE_OPTIMIZATION === "true",

  /* Derived Values */
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
} as const;

/**
 * Type-safe environment access with runtime validation
 */
export function getRequiredEnv(key: (typeof requiredEnvVars)[number]): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable "${key}" is not set`);
  }
  return value;
}

export function getOptionalEnv(
  key: OptionalEnvVar,
  defaultValue: string = ""
): string {
  return process.env[key] || defaultValue;
}
