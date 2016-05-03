import { push as pushRoute } from 'react-router-redux';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
import generateId from 'shortid';
import { createAction } from 'api/client';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const viewRecord = id => pushRoute(`/projects/${id}/goals/active`);

export const viewIndex = () => pushRoute('/projects');

export const createRecord = name => async dispatch => {
  const transactionId = generateId();

  const response = await dispatch(
    createAction(
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

  dispatch(viewRecord(response.payload.id));
};

export const updateRecord = (id, payload) => {
  const transactionId = generateId();

  return createAction(
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
  )(id, payload);
};

export const replaceRecord = (id, payload) => {
  const transactionId = generateId();

  return createAction(
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
  )(id, payload);
};

export const deleteRecord = id => async dispatch => {
  const transactionId = generateId();

  await dispatch(
    createAction(
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

  dispatch(viewIndex());
};

export const fetchRecord = id => createAction(
  actionTypes.api.fetchRecord,
  service.fetchRecord,
)(id);

export const fetchCollection = query => createAction(
  actionTypes.api.fetchCollection,
  service.fetchCollection,
  {
    request: { payload: { query } },
    success: {
      payload: (action, state, res) => res.json().then(json => Object.assign({}, json, { query })),
    },
    failure: { payload: { query } },
  }
)(query);
