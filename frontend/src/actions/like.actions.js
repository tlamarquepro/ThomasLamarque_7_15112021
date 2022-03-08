import axios from "axios";

export const GET_ALLLIKES = "GET_ALLLIKES";
export const ADD_LIKE = "ADD_LIKE";

export const getAllLikes = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_URL_API}api/likes`)
      .then((res) => {
        dispatch({ type: GET_ALLLIKES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addAndDeleteLike = (data) => {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_URL_API}api/likes`, data);
  };
};
