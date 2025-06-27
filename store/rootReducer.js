import { combineReducers } from "redux";
import serviceReducer from "./slices/services";
import teamReducer from "./slices/doctor";
import devicesReducer from "./slices/devices";

const rootReducer = combineReducers({
  services: serviceReducer,
    teams: teamReducer,
    devices: devicesReducer,
  // add more slices here
});

export default rootReducer;