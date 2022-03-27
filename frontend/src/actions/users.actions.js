import axios from "axios";

export const GET_USERS = "GET_USERS";
export const UPDATE_USER = "UPDATE_USER";


export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_URL_API}api/users`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateUser = (data, id) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_URL_API}api/users/${id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteUser = (userId) => {
  return (dispatch) => {
    return axios.delete(`${process.env.REACT_APP_URL_API}api/users/${userId}`);
  };
};