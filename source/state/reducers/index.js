import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import iconReducer from './iconReducer';

const reducers = combineReducers({
  icons: iconReducer,
  users: usersReducer,
});

export default reducers;
