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
  [actionTypes.DESTROY]: {
    next: mutations.destroyRecord,
    throw: mutations.handleError,
  },
  [actionTypes.GET]: {
    next: mutations.getRecord,
    throw: mutations.handleError,
  },
  [actionTypes.FETCH]: {
    next: mutations.fetchRecords,
    throw: mutations.handleError,
  },
  ...additionalCases,
}, {});
