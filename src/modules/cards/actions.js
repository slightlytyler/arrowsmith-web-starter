import request from 'utils/request';
import { SET_CARD } from 'modules/cards/constants';

export const fetchCard = () => async (dispatch, getState) => {
  try {
    const response = await request.get(
      'stripe',
      `customers/${getState().user.id}/cards`
    );

    dispatch({
      type: SET_CARD,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};
