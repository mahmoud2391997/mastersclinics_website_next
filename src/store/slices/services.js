import { get } from "../../api/fetching"; // Axios helper

// Initial state
const initialState = {
  services: [],
  selectedService: null, // 👈 new field for single service
  loading: false,
  error: null,
};

// Action Types
const FETCH_SERVICES_START = "services/fetch_start";
const FETCH_SERVICES_SUCCESS = "services/fetch_success";
const FETCH_SERVICES_ERROR = "services/fetch_error";

const FETCH_SERVICE_BY_ID_START = "services/fetch_by_id_start";
const FETCH_SERVICE_BY_ID_SUCCESS = "services/fetch_by_id_success";
const FETCH_SERVICE_BY_ID_ERROR = "services/fetch_by_id_error";

// Reducer
const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES_START:
    case FETCH_SERVICE_BY_ID_START:
      return { ...state, loading: true, error: null };

    case FETCH_SERVICES_SUCCESS:
      return { ...state, loading: false, services: action.payload };

    case FETCH_SERVICE_BY_ID_SUCCESS:
      return { ...state, loading: false, selectedService: action.payload };

    case FETCH_SERVICES_ERROR:
    case FETCH_SERVICE_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default serviceReducer;

// Thunk: Fetch all services
export const fetchServices = () => async (dispatch) => {
  dispatch({ type: FETCH_SERVICES_START });
  try {
    const data = await get("/services");
    console.log(data);
    
    dispatch({ type: FETCH_SERVICES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_SERVICES_ERROR, payload: error.message });
  }
};

// Thunk: Fetch service by ID
export const fetchServiceById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_SERVICE_BY_ID_START });
  try {
    const data = await get(`/services/${id}`);
    dispatch({ type: FETCH_SERVICE_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_SERVICE_BY_ID_ERROR, payload: error.message });
  }
};
