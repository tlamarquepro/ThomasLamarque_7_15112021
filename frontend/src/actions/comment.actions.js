import axios from "axios";

export const GET_ALLCOMMENTS = "GET_ALLCOMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";

export const getAllComments = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_URL_API}api/comments`)
      .then((res) => {
        dispatch({ type: GET_ALLCOMMENTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_URL_API}api/comments`, data);
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios.delete(`${process.env.REACT_APP_URL_API}api/comments/byId/${postId}`);
  };
};