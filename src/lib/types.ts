/**
 * TypeScript utility types for better type safety throughout the application
 */

/**
 * Extracts the data type from a Promise
 * Usage: await Awaited<typeof somePromise>
 */
export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

/**
 * Makes all properties optional recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Makes all properties required recursively
 */
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;

/**
 * Extracts the value type from an array
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Makes specific keys required
 */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Makes specific keys optional
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Readonly version of a type
 */
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Result type for operations that can succeed or fail
 */
export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

/**
 * Async result type
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * Page parameters for pagination
 */
export interface PageParams {
  page: number;
  limit: number;
  skip: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Generic filter type for search parameters
 */
export type FilterParams<T> = {
  [K in keyof T]?: T[K] | T[K][];
};

/**
 * API response with metadata
 */
export interface ApiResponseWithMetadata<T> {
  data: T;
  metadata: {
    timestamp: string;
    version: string;
  };
}

/**
 * Extract union of a specific field from an array of objects
 */
export type UnionFromArray<T extends readonly unknown[]> = T extends readonly (infer U)[]
  ? U
  : never;

/**
 * Make a type nullable
 */
export type Nullable<T> = T | null;

/**
 * Make a type nullable and undefined
 */
export type Optional<T> = T | null | undefined;

/**
 * Extract function parameters
 */
export type FunctionParameters<T extends (...args: unknown[]) => unknown> = T extends (
  ...args: infer P
) => unknown
  ? P
  : never;

/**
 * Extract function return type
 */
export type FunctionReturnType<T extends (...args: unknown[]) => unknown> = T extends (
  ...args: unknown[]
) => infer R
  ? R
  : never;
