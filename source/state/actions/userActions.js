import axios from 'axios';

import { FETCH_USERS_COMPLETED, FETCH_USERS_FAILED } from '../constants/action-types';

export const fetchUsers = () => {
  return (dispatch) => {
    const options = {
      url: 'https://jsonplaceholder.typicode.com/users',
    };
    axios.request(options).catch((error) => {
      dispatch({ type: FETCH_USERS_FAILED, payload: error });
    }).then((result) => {
      dispatch({ type: FETCH_USERS_COMPLETED, payload: result.data });
    });
  };
};
