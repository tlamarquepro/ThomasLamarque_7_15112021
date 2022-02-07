import { GET_ALLCOMMENTS } from "../actions/comment.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALLCOMMENTS:
      return action.payload;
    default:
      return state;
  }
}
