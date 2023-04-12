import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import session from "redux-persist/lib/storage/session";
import worker from "./worker";

const persistConfig = {
  key: "uInfo",
  storage: session,
};

const reducer = combineReducers({
  worker,
});

export default persistReducer(persistConfig, reducer);
