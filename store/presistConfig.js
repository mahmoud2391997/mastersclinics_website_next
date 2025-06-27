import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["services"], // which slices to persist
};

export default persistConfig;
