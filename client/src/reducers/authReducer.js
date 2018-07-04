import isEmpty from "../validation/is-empty";

import {
  SET_CURRENT_USER,
  LIKE_POKEMON,
  UNLIKE_POKEMON,
  ADD_COMPARE_POKEMON
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(action);
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
    case ADD_COMPARE_POKEMON:
      let newStateCompare = { ...state };
      newStateCompare.user.compare = action.payload;
      console.log(newStateCompare);
      console.log(newState);
      return newStateCompare;
    default:
      return state;
  }
}
