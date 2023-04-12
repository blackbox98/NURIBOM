import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./user";
import weather from "./weather";

const persistConfig = {
  key: "root",
  storage: storage,
};

export const rootReducer = combineReducers({
  weather,
  user,
});

export default persistReducer(persistConfig, rootReducer);
