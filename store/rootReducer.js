import { combineReducers } from "redux";
import serviceReducer from "./slices/services";
import teamReducer from "./slices/doctor";
import devicesReducer from "./slices/devices";
import branchesReducer from "./slices/branches";
import offersReducer from "./slices/offers";

const rootReducer = combineReducers({
  services: serviceReducer,
    teams: teamReducer,
    devices: devicesReducer,
    branches:branchesReducer,
            offers: offersReducer,

  // add more slices here
});

export default rootReducer;