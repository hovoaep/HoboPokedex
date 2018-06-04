import isEmpty from "../validation/is-empty";

import {
  SET_CURRENT_USER,
  LIKE_POKEMON,
  UNLIKE_POKEMON
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
    case LIKE_POKEMON:
      // let likes = state.user.likes;
      // likes = action.payload;

      let newState = { ...state };
      newState.user.likes = action.payload;
      return newState;
    case UNLIKE_POKEMON:
      // likes = action.payload;

      state.user.likes = action.payload;
      return {
        ...state
        // likes
      };
    default:
      return state;
  }
}
