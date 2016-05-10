import * as actionTypes from './actionTypes';
import * as service from './service';

export const createRecord = (userId, card) => async dispatch => {
  dispatch({ type: actionTypes.createRecord.pending });

  try {
    const payload = await service.createRecord(userId, card);

    dispatch({
      type: actionTypes.createRecord.success,
      payload,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.createRecord.failure,
      payload: { error },
    });
  }
};

export const updateRecord = (userId, card) => async dispatch => {
  dispatch({ type: actionTypes.updateRecord.pending });

  try {
    const payload = await service.updateRecord(userId, card);

    dispatch({
      type: actionTypes.updateRecord.success,
      payload,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.updateRecord.failure,
      payload: { error },
    });
  }
};

export const fetchRecord = () => async (dispatch, getState) => {
  const userId = getState().user.id;

  dispatch({ type: actionTypes.fetchRecord.pending });

  try {
    const payload = await service.fetchRecord(userId);

    dispatch({
      type: actionTypes.fetchRecord.success,
      payload,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.fetchRecord.failure,
      payload: { error },
    });
  }
};
