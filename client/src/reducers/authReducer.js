import isEmpty from "../validation/is-empty";

import {
  SET_CURRENT_USER,
  LIKE_POKEMON,
  UNLIKE_POKEMON,
  ADD_COMPARE_POKEMON,
  DELETE_COMPARE_POKEMON
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
