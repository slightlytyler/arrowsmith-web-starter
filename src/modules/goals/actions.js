import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import generateId from 'shortid';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { findRecord } from './selectors';
import { actions as notificationActions } from 'modules/notifications';

export const createRecord = (projectId, text) => async dispatch => {
  const transactionId = generateId();

  dispatch({
    type: actionTypes.createRecord.pending,
    payload: {
      id: transactionId,
      projectId,
      text,
      complete: false,
    },
    meta: {
      optimistic: { type: BEGIN, id: transactionId },
    },
  });

  try {
    const payload = await service.createRecord({
      projectId,
      text,
      complete: false,
    });

    dispatch({
      type: actionTypes.createRecord.success,
      payload,
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.createRecord.failure,
      payload: { error },
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });

    dispatch(notificationActions.push({
      message: `Could not create project. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const updateRecord = (id, data) => async dispatch => {
  const transactionId = generateId();

  dispatch({
    type: actionTypes.updateRecord.pending,
    payload: { id, ...data },
    meta: {
      optimistic: { type: BEGIN, id: transactionId },
    },
  });

  try {
    const payload = await service.updateRecord(id, data);

    dispatch({
      type: actionTypes.updateRecord.success,
      payload,
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.updateRecord.failure,
      payload: { error },
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });

    dispatch(notificationActions.push({
      message: `Could not update project. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const deleteRecord = id => async dispatch => {
  const transactionId = generateId();

  dispatch({
    type: actionTypes.deleteRecord.pending,
    payload: { id },
    meta: {
      optimistic: { type: BEGIN, id: transactionId },
    },
  });

  try {
    const payload = await service.deleteRecord(id);

    dispatch({
      type: actionTypes.deleteRecord.success,
      payload,
      meta: {
        optimistic: { type: COMMIT, id: transactionId },
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.deleteRecord.failure,
      payload: { error },
      meta: {
        optimistic: { type: REVERT, id: transactionId },
      },
    });

    dispatch(notificationActions.push({
      message: `Could not delete project. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const fetchCollection = query => async dispatch => {
  dispatch({
    type: actionTypes.fetchCollection.pending,
    payload: { query },
  });

  try {
    const payload = await service.fetchCollection(query);

    dispatch({
      type: actionTypes.fetchCollection.success,
      payload: { query, ids: payload },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.fetchCollection.failure,
      payload: { query },
    });

    dispatch(notificationActions.push({
      message: `Could not fetch project collection. ${error.data.error.message}`,
      level: 'error',
    }));
  }
};

export const toggleRecord = id => (dispatch, getState) => dispatch(
  updateRecord(id, { complete: !findRecord(getState(), id).complete })
);
