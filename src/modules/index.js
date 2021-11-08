import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import map, { mapSaga } from "./map";

const rootReducer = combineReducers({ loading, map });

export function* rootSaga() {
  yield all([mapSaga()]);
}

export default rootReducer;
