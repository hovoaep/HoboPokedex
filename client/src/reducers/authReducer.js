import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, ACTIVE_EMAIL } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  isActiveEmail: "",
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
    case ACTIVE_EMAIL:
      return {
        ...state,
        isActiveEmail: action.payload
      };
    default:
      return state;
  }
}
