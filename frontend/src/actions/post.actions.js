import axios from "axios";

export const GET_ALLPOSTS = "GET_ALLPOSTS";
export const ADD_POST = "ADD_POST";

export const getAllPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_URL_API}api/posts`)
      .then((res) => {
        dispatch({ type: GET_ALLPOSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_URL_API}api/posts`, data);
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios.delete(`${process.env.REACT_APP_URL_API}api/posts/byId/${postId}`);
  };
};
