import { combineReducers } from "redux";
import serviceReducer from "./slices/services";
import teamReducer from "./slices/doctor";
import devicesReducer from "./slices/devices";
import branchesReducer from "./slices/branches";
import offersReducer from "./slices/offers";
import departmentsReducer from "./slices/departments";  
import blogsReducer from "./slices/blogs";  
import reviewsReducer from "./slices/reviews";  

const rootReducer = combineReducers({
  services: serviceReducer,
    teams: teamReducer,
    devices: devicesReducer,
    branches:branchesReducer,
            offers: offersReducer,
            departments: departmentsReducer,
            blogs: blogsReducer,
            reviews: reviewsReducer,

  // add more slices here
});

export default rootReducer;