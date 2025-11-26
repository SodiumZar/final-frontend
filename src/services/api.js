// Base API configuration
import axios from "axios";

const api_url = "http://localhost:3000";

/**
 * Axios instance configured with base URL and default headers.
 * Use this instance for all API requests to ensure consistency.
 *
 * Configuration:
 * - baseURL: Points to our JSON Server (http://localhost:3000)
 * - headers: Sets Content-Type to application/json for all requests
 * - timeout: Aborts requests that take longer than 10 seconds
 */
const api = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 detik
});

/**
 * Request Interceptor
 * This runs BEFORE every request is sent.
 * Useful for:
 * 1. Logging requests (debugging)
 * 2. Injecting Auth Tokens (e.g., Authorization: Bearer token) - Future implementation
 */
api.interceptors.request.use(
  (config) => {
    // Log the request method and URL for debugging
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error(`[API Request Error] : ${error}`);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * This runs AFTER every response is received.
 * Useful for:
 * 1. Centralized error handling (handling 401, 404, 500 globally)
 * 2. Logging responses
 * 3. Transforming response data if needed
 */
api.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error(
        "[API Response Error]",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("[API No Response]", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("[API Error]", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
