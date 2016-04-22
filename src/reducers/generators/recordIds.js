import { handleActions } from 'redux-actions';
import { mutations } from 'utils';

export default (actionTypes, additionalCases = {}) => handleActions({
  [actionTypes.CREATE]: {
    next: mutations.createRecord,
    throw: mutations.handleError,
  },
  [actionTypes.UPDATE]: {
    next: mutations.updateRecord,
    throw: mutations.handleError,
  },
  [actionTypes.REMOVE]: {
    next: mutations.deleteRecord,
    throw: mutations.handleError,
  },
  [actionTypes.GET]: {
    next: mutations.fetchRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH]: {
    next: mutations.fetchRecords,
    throw: mutations.handleError,
  },
  ...additionalCases,
}, []);
