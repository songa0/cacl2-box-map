import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import map, { mapSaga } from "./map";
import search from "./search";

const rootReducer = combineReducers({ loading, map, search });

export function* rootSaga() {
  yield all([mapSaga()]);
}

export default rootReducer;
