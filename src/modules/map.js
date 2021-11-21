import { call, put, takeLatest } from "@redux-saga/core/effects";
import { createAction, handleActions } from "redux-actions";
import * as api from "../lib/api";
import { finishLoading, startLoading } from "./loading";

const GET_BOX = "map/GET_BOX";
const GET_BOX_SUCCESS = "map/GET_BOX_SUCCESS";
const GET_BOX_FAILURE = "map/GET_BOX_FAILURE";

export const getBox = createAction(GET_BOX);

function* getBoxSaga(action) {
  yield put(startLoading(GET_BOX));
  try {
    const response = yield call(api.getBoxLoc);

    yield put({
      type: GET_BOX_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: GET_BOX_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_BOX));
}

export function* mapSaga() {
  yield takeLatest(GET_BOX, getBoxSaga);
}

const initialState = {
  info: null,
};

const map = handleActions(
  {
    [GET_BOX_SUCCESS]: (state, action) => ({
      ...state,
      info: action.payload.ListSnowRemoveBox.row,
    }),
  },
  initialState
);

export default map;
