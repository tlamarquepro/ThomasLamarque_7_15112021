import axios from "axios";

export const GET_ALLPOSTS = "GET_ALLPOSTS";
export const POST_NEWPOST = "POST_NEWPOST";

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

export const postNewPost = () => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_URL_API}api/posts`)
      .then((res) => {
        dispatch({ type: POST_NEWPOST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
