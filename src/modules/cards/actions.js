import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';
import * as service from './service';

export const createCard = createAction(actionTypes.CREATE_CARD, service.createCard);

export const updateCard = createAction(actionTypes.UPDATE_CARD, service.updateCard);

export const deleteCard = createAction(actionTypes.DELETE_CARD, service.deleteCard);

const fetchCardAction = createAction(actionTypes.FETCH_CARD, service.fetchCard);

export const fetchCard = () => (dispatch, getState) => (
  dispatch(fetchCardAction(getState().user.id))
);
