import { GET_ALLLIKES } from "../actions/like.actions";

const initialState = {};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALLLIKES:
      return action.payload;
    default:
      return state;
  }
}
