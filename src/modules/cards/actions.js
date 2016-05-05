import stripe from 'stripe';
import { mapKeys, camelCase, snakeCase } from 'lodash';
import { createApiAction } from 'api/helpers';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { selectors as userSelectors } from 'modules/user';

export const createRecord = (userId, card) => async dispatch => {
  const token = await new Promise((resolve, reject) =>
    stripe.card.createToken(
      mapKeys(card, (value, key) => snakeCase(key)
    ),
    (status, response) => {
      if (response.error) reject(response.error.message);
      else resolve(response.id);
    })
  );

  return dispatch(
    createApiAction(
      actionTypes.api.createRecord,
      service.createRecord
    )(userId, token)
  );
};

export const updateRecord = payload => (dispatch, getState) => dispatch(
  createApiAction(
    actionTypes.api.updateRecord,
    service.updateRecord
  )(userSelectors.getId(getState()), payload)
);

export const fetchRecord = () => (dispatch, getState) => dispatch(
  createApiAction(
    actionTypes.api.fetchRecord,
    service.fetchRecord,
    {
      success: {
        payload: async (action, state, res) => {
          let response = await res.json();
          response = mapKeys(response, (value, key) => camelCase(key));
          response.id = response.cardId;
          delete response.cardId;

          return response;
        },
      },
    }
  )(userSelectors.getId(getState()))
);
