import { combineReducers } from "redux";
import serviceReducer from "./slices/services";
import teamReducer from "./slices/doctor";
import devicesReducer from "./slices/devices";
import branchesReducer from "./slices/branches";
import offersReducer from "./slices/offers";
import departmentsReducer from "./slices/departments";

const rootReducer = combineReducers({
  services: serviceReducer,
    teams: teamReducer,
    devices: devicesReducer,
    branches:branchesReducer,
            offers: offersReducer,
            departments: departmentsReducer,

  // add more slices here
});

export default rootReducer;