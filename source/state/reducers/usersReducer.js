import { FETCH_USERS_COMPLETED } from '../constants/action-types';

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_COMPLETED:
      return { ...state, users: action.payload };
    default: {
      return { ...state };
    }
  }
};

export default usersReducer;
