import * as actionTypes from './actionTypes';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.fetchRecord.success:
    case actionTypes.login.success:
    case actionTypes.signUp.success:
      return Object.assign({}, state, payload);

    case actionTypes.logout.success:
      return {};

    default:
      return state;
  }
};
