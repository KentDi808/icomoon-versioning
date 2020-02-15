import { FETCH_ICONS } from '../constants/action-types';

const iconReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ICONS:
      return { ...state, iconData: action.payload };
    default: {
      return { ...state };
    }
  }
};

export default iconReducer;