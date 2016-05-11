import { push as pushRoute } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import * as service from './service';
import { actions as userActions } from 'modules/user';

export const createRecord = (plan, card, address) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.createRecord.pending });

  try {
    const planId = `GOALS_${plan.toUpperCase()}`;
    const { user } = getState();
    const payload = await service.createRecord(user.id, planId, card, address);

    dispatch({
      type: actionTypes.createRecord.success,
      payload,
    });

    await dispatch(userActions.get());

    dispatch(pushRoute('/projects'));
  } catch (error) {
    dispatch({
      type: actionTypes.createRecord.failure,
      payload: { error },
    });
  }
};

export const fetchRecord = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.fetchRecord.pending });

  try {
    const { user } = getState();
    const payload = await service.fetchRecord(user.subscriptionId, user.id);

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
