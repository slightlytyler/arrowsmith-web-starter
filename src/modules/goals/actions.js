import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import generateId from 'shortid';
import { createApiAction } from 'api/helpers';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { findRecord } from './selectors';
import { actions as notificationActions } from 'modules/notifications';

export const createRecord = (projectId, text) => async dispatch => {
  const transactionId = generateId();

  const response = await dispatch(
    createApiAction(
      actionTypes.api.createRecord,
      service.createRecord,
      {
        request: {
          meta: {
            optimistic: {
              type: BEGIN,
              id: transactionId,
              payload: {
                id: transactionId,
                text,
              },
            },
          },
        },
        success: {
          meta: {
            optimistic: { type: REVERT, id: transactionId },
          },
        },
        failure: {
          meta: {
            optimistic: { type: REVERT, id: transactionId },
          },
        },
      }
    )(projectId, text)
  );

  if (response.error) {
    dispatch(notificationActions.push({
      message: `Could not create goal. ${response.payload.name}`,
      level: 'error',
    }));
  }
};

export const updateRecord = (id, payload) => async dispatch => {
  const transactionId = generateId();

  const response = await dispatch(
    createApiAction(
      actionTypes.api.updateRecord,
      service.updateRecord,
      {
        request: {
          meta: {
            optimistic: {
              type: BEGIN,
              id: transactionId,
              payload: { id, ...payload },
            },
          },
        },
        success: {
          meta: {
            optimistic: { type: REVERT, id: transactionId },
          },
        },
        failure: {
          meta: {
            optimistic: { type: REVERT, id: transactionId },
          },
        },
      }
    )(id, payload)
  );

  if (response.error) {
    dispatch(notificationActions.push({
      message: `Could not update goal. ${response.payload.name}`,
      level: 'error',
    }));
  }
};

export const replaceRecord = (id, payload) => async dispatch => {
  const transactionId = generateId();

  const response = await dispatch(
    createApiAction(
      actionTypes.api.replaceRecord,
      service.replaceRecord,
      {
        request: {
          meta: {
            optimistic: {
              type: BEGIN,
              id: transactionId,
              payload: { id, ...payload },
            },
          },
        },
        success: {
          meta: {
            optimistic: { type: REVERT, id: transactionId },
          },
        },
        failure: {
          meta: {
            optimistic: { type: REVERT, id: transactionId },
          },
        },
      }
    )(id, payload)
  );

  if (response.error) {
    dispatch(notificationActions.push({
      message: `Could not replace goal. ${response.payload.name}`,
      level: 'error',
    }));
  }
};

export const deleteRecord = id => async dispatch => {
  const transactionId = generateId();

  const response = await dispatch(
    createApiAction(
      actionTypes.api.deleteRecord,
      service.deleteRecord,
      {
        request: {
          meta: {
            optimistic: {
              type: BEGIN,
              id: transactionId,
              payload: { id },
            },
          },
        },
        success: {
          meta: {
            optimistic: { type: COMMIT, id: transactionId },
          },
        },
        failure: {
          meta: {
            optimistic: { type: REVERT, id: transactionId },
          },
        },
      }
    )(id)
  );

  if (response.error) {
    dispatch(notificationActions.push({
      message: `Could not delete goal. ${response.payload.name}`,
      level: 'error',
    }));
  }
};

export const fetchRecord = id => async dispatch => {
  const response = await dispatch(
    createApiAction(
      actionTypes.api.fetchRecord,
      service.fetchRecord,
    )(id)
  );

  if (response.error) {
    dispatch(notificationActions.push({
      message: `Could not fetch goal. ${response.payload.name}`,
      level: 'error',
    }));
  }
};

export const fetchCollection = query => async dispatch => {
  const response = await dispatch(
    createApiAction(
      actionTypes.api.fetchCollection,
      service.fetchCollection,
      {
        request: { payload: { query } },
        success: {
          payload: (action, state, res) => (
            res.json().then(json => Object.assign({}, json, { query }))
          ),
        },
        failure: { payload: { query } },
      }
    )(query)
  );

  if (response.error) {
    dispatch(notificationActions.push({
      message: `Could not fetch goal collection. ${response.payload.name}`,
      level: 'error',
    }));
  }
};

export const toggleRecord = id => (dispatch, getState) => {
  const record = findRecord(getState(), id);
  dispatch(updateRecord(id, { complete: !record.complete }));
};
