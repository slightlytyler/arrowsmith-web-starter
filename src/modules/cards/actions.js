import { createAction } from 'redux-actions';
import request from 'utils/request';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const createCard = createAction(
  actionTypes.CREATE_CARD,
  service.createCard
);

export const fetchCard = () => async (dispatch, getState) => {
  try {
    const response = await request.get(
      'stripe',
      `customers/${getState().user.id}/cards`
    );

    dispatch({
      type: actionTypes.SET_CARD,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};
