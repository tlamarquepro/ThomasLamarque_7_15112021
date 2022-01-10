import { GET_ALLPOSTS, POST_NEWPOST } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALLPOSTS:
      return action.payload;
    case POST_NEWPOST:
      return action.payload;
    default:
      return state;
  }
}
