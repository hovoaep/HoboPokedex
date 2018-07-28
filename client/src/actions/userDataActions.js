import * as TYPES from "./types";
import axios from "axios";

export const setProfileLoading = () => {
  return {
    type: TYPES.PROFILE_LOADING
  };
};

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: TYPES.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: TYPES.GET_PROFILE,
        payload: {}
      })
    );
};

export const likePokemon = pokemonId => dispatch => {
  axios
    .post(`/api/profile/like/${pokemonId}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: TYPES.LIKE_POKEMON,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err
      });
    });
};

export const unLikePokemon = data => dispatch => {
  const { pokemonId } = data;
  axios
    .delete(`/api/profile/like/${pokemonId}`)
    .then(res => {
      dispatch({
        type: TYPES.UNLIKE_POKEMON,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err
      })
    );
};

export const addComparePokemon = pokemonId => dispatch => {
  axios
    .post(`/api/profile/compare/${pokemonId}`)
    .then(res => {
      dispatch({
        type: TYPES.ADD_COMPARE_POKEMON,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err
      })
    );
};

export const deleteComparePokemon = pokemonId => dispatch => {
  axios
    .delete(`/api/profile/compare/${pokemonId}`)
    .then(res => {
      dispatch({
        type: TYPES.DELETE_COMPARE_POKEMON,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err
      })
    );
};

export const clearCurrentProfile = () => {
  return {
    type: TYPES.CLEAR_CURRENT_PROFILE
  };
};
