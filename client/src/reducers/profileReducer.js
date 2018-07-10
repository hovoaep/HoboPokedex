import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  LIKE_POKEMON,
  UNLIKE_POKEMON,
  ADD_COMPARE_POKEMON,
  DELETE_COMPARE_POKEMON
} from "../actions/types";

const initialState = {
  userData: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIKE_POKEMON:
      return {
        ...state,
        userData: action.payload,
        loading: false
      };
    case UNLIKE_POKEMON:
      return {
        ...state,
        userData: action.payload,
        loading: false
      };
    case ADD_COMPARE_POKEMON:
      return {
        ...state,
        userData: action.payload,
        loading: false
      };
    case DELETE_COMPARE_POKEMON:
      return {
        ...state,
        userData: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        userData: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        userData: null
      };
    default:
      return state;
  }
}
