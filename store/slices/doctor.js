import { get, getById } from "../../pages/api/fetching";

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
export const fetchTeams = () => async (dispatch) => {
  dispatch({ type: FETCH_TEAMS_START });
  try {
    const data = await get("/doctors"); // adjust to your API endpoint
    console.log(data);
    
    dispatch({ type: FETCH_TEAMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TEAMS_ERROR, payload: error.message });
  }
};

// Thunk: Fetch team member by ID
export const fetchTeamById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_TEAM_BY_ID_START });
  try {
    const data = await getById("/doctors", id);
    dispatch({ type: FETCH_TEAM_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TEAM_BY_ID_ERROR, payload: error.message });
  }
};
