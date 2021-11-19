import { call, put, takeLatest } from "@redux-saga/core/effects";
import { createAction, handleActions } from "redux-actions";
import * as api from "../lib/api";
import { finishLoading, startLoading } from "./loading";

const GET_GEO = "map/GET_GEO";
const GET_GEO_SUCCESS = "map/GET_GEO_SUCCESS";
const GET_GEO_FAILURE = "map/GET_GEO_FAILURE";

export const getGeo = createAction(GET_GEO, (keyword) => keyword);

function* getGeoSaga(action) {
  yield put(startLoading(GET_GEO));
  try {
    const response = yield call(api.getGeocode, action.payload);
    yield put({
      type: GET_GEO_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: GET_GEO_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_GEO));
}

export function* mapSaga() {
  yield takeLatest(GET_GEO, getGeoSaga);
}

const initialState = {
  lat: 37.5110621,
  lng: 127.0355215,
  keyword: null,
  info: null,
};

const map = handleActions(
  {
    [GET_GEO_SUCCESS]: (state, action) => ({
      ...state,
      lat: action.payload.addresses[0].y,
      lng: action.payload.addresses[0].x,
      info: action.payload,
    }),
  },
  initialState
);

export default map;
