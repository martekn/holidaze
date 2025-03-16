import { API_BASE_URL } from "../constants";
import { getAuthToken } from "../cookies/server";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Endpoint =
  | "auth/login"
  | "auth/register"
  | "holidaze/venues"
  | "/holidaze/bookings"
  | `/holidaze/bookings/${string}`
  | `/holidaze/venues/${string}`
  | `/holidaze/profiles/${string}`
  | `/holidaze/profiles/${string}/bookings`
  | `/holidaze/profiles/${string}/venues`;

type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

type FetchOptions<TBody = unknown> = {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  requireAuth?: boolean;
  apiKey?: string;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  query?: Record<
    string,
    string | number | boolean | undefined | null | (string | number | boolean)[]
  >;
};

const API_KEY = process.env.API_KEY;

/**
 * Generates headers for the fetch request.
 *
 * @param options - Configuration options for generating headers.
 * @param [options.headers] - Additional headers to include in the request.
 * @param [options.requireAuth] - Whether authentication is required for the request.
 * @param [options.apiKey] - The API key to use for the request.
 * @returns - The generated headers.
 * @throws - Throws an error if the API key is missing or if authentication is required but no token is found.
 */
const generateHeaders = (options: Pick<FetchOptions, "headers" | "requireAuth" | "apiKey">) => {
  const apiKey = options.apiKey || API_KEY;

  if (!apiKey) {
    throw new Error("API is required but not provided");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": apiKey,
    ...options.headers
  };

  if (options.requireAuth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      throw new Error("Authentication token is required but not found");
    }
  }

  return headers;
};

/**
 * Generates the full URL for the fetch request, including query parameters.
 *
 * @param endpoint - The API endpoint to fetch data from.
 * @param [query] - Query parameters to include in the URL.
 * @returns - The generated URL.
 */
const generateUrl = (endpoint: Endpoint, query?: FetchOptions["query"]) => {
  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (query && Object.keys(query).length > 0) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      if (Array.isArray(value)) {
        for (const item of value) {
          if (item !== undefined && item !== null) {
            searchParams.append(key, String(item));
          }
        }
      } else {
        searchParams.append(key, String(value));
      }
    }

    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  return url;
};

/**
 * Generates the fetch options for the request, including method, headers, and body.
 *
 * @param headers - The headers to include in the request.
 * @param options - Configuration options for the fetch request.
 * @param [options.method] - The HTTP method to use (e.g., "GET", "POST").
 * @param [options.body] - The request body for non-GET requests.
 * @param [options.cache] - The caching strategy for the request.
 * @param [options.next] - Next.js-specific fetch configuration.
 * @returns - The generated fetch options.
 */
const generateFetchOptions = <TBody>(
  headers: Record<string, string>,
  options: FetchOptions<TBody>
): RequestInit => {
  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers,
    cache: options.cache,
    next: options.next
  };

  if (options.body && options.method !== "GET") {
    fetchOptions.body = JSON.stringify(options.body);
  }

  return fetchOptions;
};

/**
 * Fetches data from the specified API endpoint.
 *
 * @param endpoint - The API endpoint to fetch data from.
 * @param [options] - Optional configuration for the fetch request.
 * @param [options.method] - The HTTP method to use (e.g., "GET", "POST").
 * @param [options.body] - The request body for non-GET requests.
 * @param [options.headers] - Additional headers to include in the request.
 * @param [options.requireAuth] - Whether authentication is required for the request.
 * @param [options.apiKey] - The API key to use for the request.
 * @param [options.cache] - The caching strategy for the request.
 * @param [options.next] - Next.js-specific fetch configuration.
 * @param [options.query] - Query parameters to include in the request URL.
 * @returns - The response data if the request is successful, or an error object if the request fails.
 * @throws - Throws an error if the fetch request fails unexpectedly.
 */
export const apiFetch = async <TBody = unknown>(
  endpoint: Endpoint,
  options: FetchOptions<TBody> = {}
): Promise<unknown> => {
  const headers = generateHeaders(options);
  const url = generateUrl(endpoint, options.query);
  const fetchOptions = generateFetchOptions<TBody>(headers, options);

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
      return { error: true, data };
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
