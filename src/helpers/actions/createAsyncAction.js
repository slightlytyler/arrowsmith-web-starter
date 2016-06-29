import { curry } from 'lodash';

export default curry((actionTypes, key) => {
  const action = payload => ({
    type: actionTypes[key].pending,
    payload,
  });

  action.success = payload => ({
    type: actionTypes[key].success,
    payload,
  });

  action.failure = error => ({
    type: actionTypes[key].failure,
    payload: { error },
  });

  return action;
});
