import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import usersReducer from "./users.reducer";
import commentReducer from "./comment.reducer";
import likeReducer from "./like.reducer";

export default combineReducers({
  postReducer,
  userReducer,
  usersReducer,
  commentReducer,
  likeReducer
});
