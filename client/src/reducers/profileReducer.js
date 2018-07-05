import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  LIKE_POKEMON,
  UNLIKE_POKEMON,
  ADD_COMPARE_POKEMON,
  DELETE_COMPARE_POKEMON
} from "../actions/types";

const initialState = {
  profile: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIKE_POKEMON:
      let newState = { ...state };
      newState.user.likes = action.payload;
      return newState;
    case UNLIKE_POKEMON:
      state.user.likes = action.payload;
      return {
        ...state
      };
    case ADD_COMPARE_POKEMON:
      let newStateCompare = { ...state };
      newStateCompare.user.compare = action.payload;
      return newStateCompare;
    case DELETE_COMPARE_POKEMON:
      let deleteStateCompare = { ...state };
      deleteStateCompare.user.compare = action.payload;
      return deleteStateCompare;
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      console.log(action.payload);
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
