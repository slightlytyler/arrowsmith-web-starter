import { push as pushRoute } from 'react-router-redux';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import generateId from 'shortid';
import { createApiAction } from 'api/helpers';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { actions as notificationActions } from 'modules/notifications';

export const viewRecord = id => pushRoute(`/projects/${id}/goals/active`);

export const viewIndex = () => pushRoute('/projects');

export const createRecord = name => async dispatch => {
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
                name,
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
    )(name)
  );

  if (response.error) {
    dispatch(notificationActions.push({
      message: `Could not create project. ${response.payload.name}`,
      level: 'error',
    }));
  } else {
    dispatch(viewRecord(response.payload.id));
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
      message: `Could not update project. ${response.payload.name}`,
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
      message: `Could not replace project. ${response.payload.name}`,
      level: 'error',
    }));
  }
};

export const deleteRecord = id => async dispatch => {
  const transactionId = generateId();

  dispatch(viewIndex());

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
      message: `Could not delete project. ${response.payload.name}`,
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
      message: `Could not fetch project. ${response.payload.name}`,
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
      message: `Could not fetch project collection. ${response.payload.name}`,
      level: 'error',
    }));
  }
};
