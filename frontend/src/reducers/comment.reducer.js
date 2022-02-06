import { GET_ALLCOMMENTS } from "../actions/post.actions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALLCOMMENTS:
      return action.payload;
    default:
      return state;
  }
}
