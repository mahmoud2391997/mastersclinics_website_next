import { get, getById } from "../../pages/api/fetching";
import Teams from "../../helpers/api/team"; // Adjust the import path as needed

// Initial State
const initialState = {
  teams: [],
  selectedTeam: null,
  loading: false,
  error: null,
};

// Action Types
const FETCH_TEAMS_START = "teams/fetch_start";
const FETCH_TEAMS_SUCCESS = "teams/fetch_success";
const FETCH_TEAMS_ERROR = "teams/fetch_error";

const FETCH_TEAM_BY_ID_START = "teams/fetch_by_id_start";
const FETCH_TEAM_BY_ID_SUCCESS = "teams/fetch_by_id_success";
const FETCH_TEAM_BY_ID_ERROR = "teams/fetch_by_id_error";

// Reducer
const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAMS_START:
    case FETCH_TEAM_BY_ID_START:
      return { ...state, loading: true, error: null };

    case FETCH_TEAMS_SUCCESS:
      return { ...state, loading: false, teams: action.payload };

    case FETCH_TEAM_BY_ID_SUCCESS:
      return { ...state, loading: false, selectedTeam: action.payload };

    case FETCH_TEAMS_ERROR:
    case FETCH_TEAM_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default teamReducer;

// Thunk: Fetch all teams
export const fetchTeams = ({ branchId = null, departmentId = null } = {}) => async (dispatch) => {
  dispatch({ type: FETCH_TEAMS_START });

  try {
    // Build query string
    const query = new URLSearchParams();
    if (branchId) query.append("branchId", branchId);
    if (departmentId) query.append("departmentId", departmentId);

    const endpoint = query.toString() ? `/doctors?${query}` : `/doctors`;
    let data = await get(endpoint);

    // Fallback if empty response
    if (!data || data.length === 0) {
      data = Teams;
    }

    dispatch({ type: FETCH_TEAMS_SUCCESS, payload: data });
  } catch (error) {
    console.error("fetchTeams error:", error);
    dispatch({ type: FETCH_TEAMS_FAILURE, payload: error.message || "Failed to fetch teams" });

    // Fallback to local data
    dispatch({ type: FETCH_TEAMS_SUCCESS, payload: Teams });
  }
};

// Thunk: Fetch team member by ID
export const fetchTeamById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_TEAM_BY_ID_START });
  try {
    let data = await getById("/doctors", id);
    
    // If API returns no data, try to find in local Teams data
    if (!data) {
      data = Teams.find(team => team.id === id);
    }
    
    if (data) {
      dispatch({ type: FETCH_TEAM_BY_ID_SUCCESS, payload: data });
    } else {
      dispatch({ 
        type: FETCH_TEAM_BY_ID_ERROR, 
        payload: `Team member with ID ${id} not found` 
      });
    }
  } catch (error) {
    // If API fails, try to find in local Teams data
    const localData = Teams.find(team => team.id === id);
    if (localData) {
      dispatch({ type: FETCH_TEAM_BY_ID_SUCCESS, payload: localData });
    } else {
      dispatch({ 
        type: FETCH_TEAM_BY_ID_ERROR, 
        payload: error.message || `Team member with ID ${id} not found` 
      });
    }
  }
};