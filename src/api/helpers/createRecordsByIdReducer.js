import { updateIn, assoc, dissoc, merge } from 'react-update-in';
import { createRecordsById } from 'utils';
import { actionTypesShape } from '../constants';

// Create reducer for handling records dictionary
export default moduleActionTypes => (state = {}, { type, payload }) => {
  const actionTypes = { ...actionTypesShape, ...moduleActionTypes };

  switch (type) {
    case actionTypes.createRecord.pending:
    case actionTypes.replaceRecord.pending:
      return assoc(state, payload.id, payload);

    case actionTypes.updateRecord.pending:
      return updateIn(state, [payload.id], merge, payload);

    case actionTypes.deleteRecord.pending:
      return dissoc(state, payload.id);

    case actionTypes.createRecord.success:
    case actionTypes.updateRecord.success:
    case actionTypes.replaceRecord.success:
    case actionTypes.fetchRecord.success:
      return assoc(state, payload.id, payload);

    case actionTypes.fetchCollection.success:
      return { ...state, ...createRecordsById(payload.ids) };

    default:
      return state;
  }
};
