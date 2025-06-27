import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL:  "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Attach token




// Error handler
const handleApiError = (error) => {
  if (axios.isAxiosError(error)) {
    const serverError = error.response?.data;
    if (serverError && typeof serverError === "object") {
      return new Error(serverError.message || "An unexpected error occurred");
    }
  }
  return error instanceof Error ? error : new Error("An unexpected error occurred");
};

// Generic GET
export const get = async (url, config = {}) => {
  try {
    const response = await api.get(url, {  timeout: 30000, // ⬅️ increase to 30 seconds or more
});
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// GET by ID (e.g., /services/123)
export const getById = async (url, id, config = {}) => {
  return get(`${url}/${id}`, config);
};

export default api;
