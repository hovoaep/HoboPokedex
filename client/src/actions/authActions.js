import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE,
  UNLIKE_POKEMON,
  ADD_COMPARE_POKEMON
} from "./types";

// Register UserSET_CU
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export function setCurrentUser(decoded) {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
}

export const temp = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const likePokemon = data => dispatch => {
  const { id, pokemonId } = data;
  axios
    .post(`/api/users/like/${id}/${pokemonId}`)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      // dispatch({
      //   type: LIKE_POKEMON,
      //   payload: res.data
      // });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const unLikePokemon = data => dispatch => {
  const { id, pokemonId } = data;
  axios
    .delete(`/api/users/like/${id}/${pokemonId}`)
    .then(res => {
      dispatch({
        type: UNLIKE_POKEMON,
        payload: res.data.likes
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const addComparePokemon = (id, pokemonId) => dispatch => {
  axios
    .post(`/api/users/compare/${id}/${pokemonId}`)
    .then(res => {
      dispatch({
        type: ADD_COMPARE_POKEMON,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
