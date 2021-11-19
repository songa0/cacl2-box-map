import { createAction, handleActions } from "redux-actions";

const CLICK = "search/SEARCH";

export const click = createAction(CLICK, (keyword) => keyword);

const initialState = {
  keyword: null,
};

const search = handleActions(
  {
    [CLICK]: (state, { payload: keyword }) => ({ ...state, keyword }),
  },
  initialState
);

export default search;
