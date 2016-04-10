import request from 'utils/request';
import stripe from 'stripe';
import { push } from 'react-router-redux';
import { mapKeys, snakeCase } from 'lodash';

export const createSubscriptionFlow = (plan, card, address) => async (dispatch, getState) => {
  try {
    const planId = `GOALS_${plan.toUpperCase()}`;
    const { user } = getState();

    // Create stripe customer
    await request.post('stripe', 'customers', { userId: user.id });

    // Update user with address
    await request.put('user', `users/${user.id}`, { address });

    // Create credit card
    const token = await new Promise((resolve, reject) =>
      stripe.card.createToken(
        mapKeys(card,
        (value, key) => snakeCase(key)
      ),
      (status, response) => {
        if (response.error) reject(response.error.message);
        else resolve(response.id);
      })
    );
    await request.post('stripe', `customers/${user.id}/cards`, { token });

    // Create Subscription
    await request.post('stripe', `customers/${user.id}/subscriptions`, { planId });

    // Transition to dashboard
    dispatch(push('/projects'));
  } catch (error) {
    throw error;
  }
};

export const viewSubscriptionOptions = () => push('/start-subscription');
