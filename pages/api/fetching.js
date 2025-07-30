import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL:  "https://www.ss.mastersclinics.com",
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
export const get = async (url) => {
  try {
    const response = await api.get(url, {  timeout: 30000, // ⬅️ increase to 30 seconds or more
});
    return response.data;
  } catch (error) {
    console.log(error);
    
    throw handleApiError(error);
  }
};

export const getById = async (url, id, config = {}) => {
  try {
    const data = await get(`${url}/${id}`, config);
    return data && data.id ? data : null;
  } catch (error) {
    console.warn("getById failed for:", `${url}/${id}`, error.message);
    return null;
  }
};


export default api;
