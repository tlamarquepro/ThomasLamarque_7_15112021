import axios from "axios";

export const GET_ALLPOSTS = "GET_ALLPOSTS";

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