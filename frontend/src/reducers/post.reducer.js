import { GET_ALLPOSTS } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALLPOSTS:
      return action.payload;
    default:
      return state;
  }
}
