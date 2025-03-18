import { API_BASE_URL } from "../constants";
import { getAuthToken } from "../cookies/server";
import axios, { AxiosRequestConfig } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Endpoint =
  | "/auth/login"
  | "/auth/register"
  | "/holidaze/venues"
  | "/holidaze/bookings"
  | "/holidaze/profiles"
  | `/holidaze/bookings/${string}`
  | `/holidaze/venues/${string}`
  | `/holidaze/profiles/${string}`
  | `/holidaze/profiles/${string}/bookings`
  | `/holidaze/profiles/${string}/venues`;

type FetchOptions<TData = unknown> = {
  method?: HttpMethod;
  data?: TData;
  headers?: Record<string, string>;
  requireAuth?: boolean;
  apiKey?: string;
  query?: Record<
    string,
    string | number | boolean | undefined | null | (string | number | boolean)[]
  >;
};

const API_KEY = process.env.API_KEY;

/**
 * Generates headers for the axios request.
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
 * Generates the full URL for the axios request, including query parameters.
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
 * Generates the axios options for the request, including method, headers, and body.
 *
 * @param headers - The headers to include in the request.
 * @param options - Configuration options for the fetch request.
 * @param [options.method] - The HTTP method to use (e.g., "GET", "POST").
 * @param [options.body] - The request body for non-GET requests.
 * @returns - The generated fetch options.
 */
const generateAxiosConfig = <TData>(
  headers: Record<string, string>,
  options: FetchOptions<TData>
): AxiosRequestConfig => {
  const axiosConfig: AxiosRequestConfig<TData> = {
    method: options.method || "GET",
    headers
  };

  if (options.data && options.method !== "GET") {
    axiosConfig.data = options.data;
  }

  return axiosConfig;
};

/**
 * Fetches data from the specified API endpoint with axios.
 *
 * @param endpoint - The API endpoint to fetch data from.
 * @param [options] - Optional configuration for the axios request.
 * @param [options.method] - The HTTP method to use (e.g., "GET", "POST").
 * @param [options.data] - The request body for non-GET requests.
 * @param [options.headers] - Additional headers to include in the request.
 * @param [options.requireAuth] - Whether authentication is required for the request.
 * @param [options.apiKey] - The API key to use for the request.
 * @param [options.query] - Query parameters to include in the request URL.
 * @returns - The response data if the request is successful
 * @throws - Throws an error if the server responds with status code outside of 2xx range or unexpected errors
 */
export const apiFetch = async <TData = unknown>(
  endpoint: Endpoint,
  options: FetchOptions<TData> = {}
): Promise<unknown> => {
  const headers = generateHeaders(options);
  const url = generateUrl(endpoint, options.query);
  const fetchOptions = generateAxiosConfig<TData>(headers, options);
  try {
    const response = await axios(url, fetchOptions);
    const data = response.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }

    // Generic error message
    console.error(error);
    throw { errors: [{ message: "Unexpected fetch error" }] };
  }
};
